# 🛠️ Configuration initiale - Studio Web 15

## ⚡ Installation ultra-rapide (10 minutes)

### Étape 1 : Créer le projet Sanity

```bash
cd shared/sanity
npx sanity init --create-project "Studio Web 15" --dataset production
```

**Important** : Notez votre `projectId` (ex: `abc123def`)

### Étape 2 : Configurer le projectId

**Fichier 1** : `.env.local` (créé automatiquement, modifier la ligne 3)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def  ← remplacer ici
```

**Fichier 2** : `shared/sanity/sanity.config.ts` (ligne 12)
```typescript
projectId: 'abc123def',  ← remplacer ici
```

### Étape 3 : Installer les dépendances

```bash
# Depuis la racine du projet
npm install

# Depuis shared/sanity
cd shared/sanity
npm install
cd ../..
```

### Étape 4 : Lancer le projet

**Terminal 1** (Site Next.js) :
```bash
npm run dev
```
→ http://localhost:3000

**Terminal 2** (Sanity Studio) :
```bash
cd shared/sanity
npm run dev
```
→ http://localhost:3333

### Étape 5 : Ajouter du contenu

1. Aller sur http://localhost:3333
2. Créer un document "Page Accueil"
3. Remplir :
   - **Hero** : 
     - Titre : "Studio Web 15 - Studio web indépendant"
     - Sous-titre : "Nous créons des expériences web sur mesure"
     - CTA : "Discutons de votre projet"
   - **Services** :
     - Titre : "Nos expertises"
     - Items : Ajouter 3-4 services
4. **Publier**

5. Actualiser http://localhost:3000

---

## 🌐 Déploiement Vercel + Staging

Voir **VERCEL.md** pour le guide complet.

**Résumé** :
1. Push sur GitHub
2. Importer sur Vercel
3. Config env vars (voir VERCEL.md)
4. Branche `staging` → URL preview pour le client

---

**C'est tout !** Le site est prêt.
