# 🚀 Démarrage Studio Web 15

## ✅ Configuration terminée

Votre projet est configuré avec :
- **Project ID** : `tgge8srz`
- **Dataset** : `production`
- **API Version** : `2024-01-01`

## 📦 Installation

```bash
# 1. Installer les dépendances du site
npm install

# 2. Installer Sanity Studio
cd shared/sanity
npm install
cd ../..
```

## 🎬 Lancer le projet

### Terminal 1 : Site Next.js
```bash
npm run dev
```
→ http://localhost:3000

### Terminal 2 : Sanity Studio
```bash
cd shared/sanity
npm run dev
```
→ http://localhost:3333

## 📝 Ajouter du contenu

1. Aller sur http://localhost:3333
2. Créer un document "Page Accueil"
3. Remplir :
   - **Hero** : Titre, sous-titre, label du bouton
   - **Services** : Liste des services (titre + description)
4. **Publier** (bouton vert en bas à droite)
5. Actualiser http://localhost:3000

## 🎨 Contenu exemple

Voir `CONTENU_EXEMPLE.md` pour le contenu à copier-coller dans Sanity.

## 🚀 Déployer

Voir `VERCEL.md` pour déployer sur Vercel avec staging.

---

**Tout est prêt, tu peux démarrer !** 🎉
