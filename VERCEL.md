# Déploiement sur Vercel - Studio Web 15

## 📋 Prérequis

1. Créer un compte Vercel (gratuit) : https://vercel.com
2. Avoir un projet Sanity créé (voir README.md)
3. Push du code sur GitHub

## 🚀 Déploiement Production

### Étape 1 : Créer le projet sur Vercel

1. Aller sur https://vercel.com/new
2. Importer votre repository GitHub `studio-web-15`
3. Configuration :
   - Framework Preset : **Next.js**
   - Build Command : `npm run build`
   - Output Directory : `.next`
   - Install Command : `npm install`

### Étape 2 : Variables d'environnement Production

Dans Vercel > Settings > Environment Variables, ajouter :

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Votre projectId Sanity | Production |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://studioweb15.fr` | Production |

### Étape 3 : Ajouter un domaine custom (optionnel)

1. Vercel > Settings > Domains
2. Ajouter `studioweb15.fr`
3. Configurer les DNS chez votre registrar selon les instructions Vercel

## 🧪 Configuration Staging (URL de démo pour le client)

### Option A : Preview Deployments (Recommandé - Plus simple)

**Principe** : Chaque branche a une URL de preview automatique

1. **Créer une branche `staging`** dans votre repo
   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

2. **Vercel va créer automatiquement une URL preview**
   - Format : `https://studio-web-15-git-staging-votreusername.vercel.app`
   - Cette URL est stable et se met à jour à chaque push sur `staging`

3. **Variables d'environnement Preview**
   
   Dans Vercel > Settings > Environment Variables, ajouter :

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Votre projectId Sanity | Preview |
   | `NEXT_PUBLIC_SANITY_DATASET` | `staging` | Preview |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | Preview |
   | `NEXT_PUBLIC_SITE_URL` | `https://studio-web-15-git-staging-votreusername.vercel.app` | Preview |

4. **Créer le dataset `staging` dans Sanity**
   ```bash
   cd shared/sanity
   npx sanity dataset create staging
   ```

5. **Workflow**
   - Vous développez sur des feature branches
   - Quand vous voulez montrer au client : `git merge feature-branch staging && git push`
   - Le client voit immédiatement sur l'URL preview
   - Quand validé : `git merge staging main && git push` → déploiement production

### Option B : Projet Vercel séparé (Plus propre mais plus de setup)

1. **Créer un 2e projet Vercel**
   - Importer le même repo
   - Nommer : `studio-web-15-staging`
   - Settings > Git : Branch à déployer = `staging`

2. **Variables d'environnement**
   - Mêmes variables que Preview ci-dessus
   - Mais environment = "Production" (car c'est le "production" de ce projet staging)

3. **URL obtenue** : `https://studio-web-15-staging.vercel.app`

4. **Avantages** : URL plus propre, séparation claire prod/staging

## 🔒 Protéger le staging (Optionnel)

Si vous voulez que seul le client avec le mot de passe puisse accéder au staging :

### Créer un middleware pour Basic Auth

Créer `middleware.ts` à la racine :

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Détecter si on est en staging
  const isStaging = 
    process.env.NEXT_PUBLIC_SITE_URL?.includes('staging') || 
    process.env.NEXT_PUBLIC_SITE_URL?.includes('vercel.app');
  
  // Ne protéger que le staging
  if (!isStaging) {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === 'client' && pwd === process.env.STAGING_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

### Ajouter la variable d'environnement

Dans Vercel (Preview uniquement) :

| Variable | Value | Environment |
|----------|-------|-------------|
| `STAGING_PASSWORD` | `votre_mot_de_passe` | Preview |

Le client devra alors entrer :
- Username : `client`
- Password : votre mot de passe choisi

## 📊 Résumé des URLs

| Environnement | URL | Dataset Sanity | Indexation |
|---------------|-----|----------------|------------|
| **Local** | http://localhost:3000 | production | - |
| **Staging** | https://...vercel.app | staging | ❌ Non indexé |
| **Production** | https://studioweb15.fr | production | ✅ Indexé |

## 🔄 Workflow recommandé

```bash
# 1. Développement local
git checkout -b feature/nouvelle-fonctionnalite
# ... faire vos modifications ...
git commit -m "feat: nouvelle fonctionnalité"

# 2. Montrer au client (staging)
git checkout staging
git merge feature/nouvelle-fonctionnalite
git push origin staging
# → Le client voit sur l'URL staging

# 3. Valider en production
git checkout main
git merge staging
git push origin main
# → Déploiement automatique en production
```

## 💡 Conseils

- **Utilisez l'Option A (Preview Deployments)** si vous débutez avec Vercel
- **Protégez le staging** uniquement si le client le demande (sinon l'URL obscure suffit)
- **Créez un dataset `staging`** dans Sanity pour éviter de polluer la production
- Vercel redéploie automatiquement à chaque push

## 🆘 Dépannage

### Le site ne build pas sur Vercel

- Vérifier que toutes les variables d'env sont bien configurées
- Vérifier les logs de build dans Vercel > Deployments > [votre deploy] > Build Logs

### Sanity renvoie une erreur

- Vérifier que le `projectId` est correct dans `.env.local` ET `shared/sanity/sanity.config.ts`
- Vérifier que le dataset existe : `npx sanity dataset list`

### Le staging est indexé par Google

- Vérifier que `NEXT_PUBLIC_SITE_URL` contient bien "staging" ou "vercel.app"
- Le fichier `app/robots.ts` détecte automatiquement le staging et désactive l'indexation
