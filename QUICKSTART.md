# 🚀 Démarrage Rapide - Studio Web 15

## 1️⃣ Créer un projet Sanity (5 min)

```bash
cd shared/sanity
npx sanity init --create-project "Studio Web 15" --dataset production
```

Vous allez obtenir un **projectId** (ex: `abc123def`).

## 2️⃣ Configurer le projectId (2 fichiers à modifier)

### Fichier 1 : `.env.local` (à la racine)

Remplacer `YOUR_PROJECT_ID` par votre projectId :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def
```

### Fichier 2 : `shared/sanity/sanity.config.ts`

Ligne 12, remplacer :
```typescript
projectId: 'YOUR_PROJECT_ID',
```

par :
```typescript
projectId: 'abc123def',
```

## 3️⃣ Installer et lancer (3 min)

```bash
# Installer les dépendances du site
npm install

# Installer Sanity Studio
cd shared/sanity
npm install
cd ../..

# Lancer le site
npm run dev

# Dans un 2e terminal : lancer Sanity Studio
cd shared/sanity
npm run dev
```

**URLs :**
- Site : http://localhost:3000
- Sanity Studio : http://localhost:3333

## 4️⃣ Ajouter du contenu dans Sanity

1. Aller sur http://localhost:3333
2. Cliquer sur "Page Accueil"
3. Remplir les champs :
   - **Hero** : Titre, sous-titre, label du bouton
   - **Services** : Liste des services

4. **Publier** (bouton vert en bas à droite)

5. Actualiser http://localhost:3000 pour voir le contenu

## 🎯 Pour montrer au client (staging)

Voir le fichier **VERCEL.md** pour les instructions complètes.

**Version ultra-rapide :**

1. Push sur GitHub
2. Importer sur Vercel
3. Ajouter les env vars (voir VERCEL.md)
4. Créer une branche `staging`
5. Donner l'URL preview au client

---

**Besoin d'aide ?** Consulter le README.md pour plus de détails.
