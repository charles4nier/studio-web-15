# Studio Web 15

Agence de développement web spécialisée en Next.js, React et solutions digitales sur mesure.

## Stack technique

- **Next.js 14** (App Router)
- **TypeScript**
- **SCSS** avec design system
- **Sanity CMS** pour la gestion de contenu
- **Framer Motion** pour les animations

## Installation

```bash
# Installer les dépendances
npm install

# Installer Sanity Studio
cd shared/sanity
npm install
cd ../..
```

## Configuration

### 1. Créer un projet Sanity

```bash
cd shared/sanity
npx sanity init --create-project "Studio Web 15" --dataset production
```

Cela va créer un projet Sanity et vous donner un `projectId`.

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine et remplacer `YOUR_PROJECT_ID` par votre projectId :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Mettre à jour le sanity.config.ts

Dans `shared/sanity/sanity.config.ts`, remplacer `YOUR_PROJECT_ID` par votre projectId.

## Développement

```bash
# Lancer le site Next.js
npm run dev

# Dans un autre terminal, lancer Sanity Studio
cd shared/sanity
npm run dev
```

- Site : http://localhost:3000
- Sanity Studio : http://localhost:3333

## Déploiement sur Vercel

### Configuration Production

1. **Créer un nouveau projet sur Vercel**
   - Importer votre repository GitHub
   - Framework : Next.js
   - Build Command : `npm run build`
   - Output Directory : `.next`

2. **Variables d'environnement sur Vercel**
   
   Aller dans Settings > Environment Variables et ajouter :
   
   **Pour Production :**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=https://studioweb15.fr
   ```

   **Pour Preview (Staging) :**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET=staging
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=https://staging-studioweb15.vercel.app
   ```

### Configuration Staging

#### Option A : Utiliser les Preview Deployments de Vercel (recommandé)

1. Créer une branche `staging` dans votre repo
2. Vercel créera automatiquement une URL de preview pour cette branche
3. L'URL sera du type : `https://studio-web-15-git-staging-votreusername.vercel.app`

**Avantages :**
- Automatique à chaque push
- URL stable pour la branche
- Parfait pour montrer au client

#### Option B : Créer un projet Vercel séparé pour staging

1. Importer le même repo une 2e fois sur Vercel
2. Nommer le projet `studio-web-15-staging`
3. Configurer la branche à déployer : `staging` (ou `main` si vous voulez)
4. Utiliser le dataset `staging` dans Sanity

**Avantages :**
- Séparation complète prod/staging
- URL dédiée plus propre : `https://studio-web-15-staging.vercel.app`

### Créer un dataset "staging" dans Sanity

```bash
cd shared/sanity
npx sanity dataset create staging
```

### Protection du staging (optionnel)

Pour protéger l'accès au staging, créer un middleware Next.js :

`middleware.ts` à la racine :

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Uniquement pour staging (détection via variable d'env ou URL)
  const isStaging = process.env.NEXT_PUBLIC_SITE_URL?.includes('staging');
  
  if (!isStaging) {
    return NextResponse.next();
  }

  // Basic Auth
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Mot de passe à configurer via env var
    if (user === 'client' && pwd === process.env.STAGING_PASSWORD) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';

  return NextResponse.rewrite(url, {
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
    status: 401,
  });
}
```

Ajouter dans Vercel (Preview uniquement) :
```
STAGING_PASSWORD=votre_mot_de_passe_secret
```

## Déployer Sanity Studio

```bash
cd shared/sanity
npx sanity deploy
```

Cela va déployer votre Studio sur `https://YOUR_PROJECT_ID.sanity.studio`

## Structure du projet

```
studio-web-15/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx
│   └── page.tsx
├── features/               # Features par page
│   └── home/
│       ├── Hero/
│       ├── Services/
│       ├── home.schema.ts
│       └── index.tsx
├── shared/                 # Code partagé
│   ├── components/         # Composants réutilisables
│   ├── config/            # Configuration SEO, etc.
│   ├── sanity/            # Sanity Studio
│   ├── styles/            # Styles globaux et variables
│   └── utils/             # Utilitaires
└── types/                 # Types TypeScript globaux
```

## Workflow recommandé

1. **Développement local** : travailler sur `main` ou feature branches
2. **Staging** : merger dans `staging` → le client voit sur l'URL de preview
3. **Production** : merger `staging` dans `main` → déploiement automatique

## Support

Pour toute question : contact@studioweb15.fr
