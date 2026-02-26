# Référencement du site – Checklist

Pour que **studioweb15.fr** soit bien indexé par Google et les autres moteurs, voici les étapes à suivre.

---

## 1. Variables d’environnement en production (Vercel)

Dans **Vercel** → ton projet → **Settings** → **Environment Variables** :

| Variable | Valeur | Important |
|----------|--------|-----------|
| `NEXT_PUBLIC_SITE_URL` | `https://studioweb15.fr` | **Obligatoire.** Si absent ou si l’URL contient `staging` ou `vercel.app`, le fichier `robots.txt` **bloque toute indexation**. |

À définir pour l’environnement **Production** (et éventuellement Preview si tu veux que les previews soient indexées, ce qui est en général déconseillé).

---

## 2. Vérifier que le site est « indexable »

Une fois le site en prod avec la bonne URL :

1. Ouvre **https://studioweb15.fr/robots.txt**  
   - Tu dois voir : `Allow: /` et `Sitemap: https://studioweb15.fr/sitemap.xml`  
   - Si tu vois `Disallow: /`, c’est que `NEXT_PUBLIC_SITE_URL` n’est pas correcte en prod.

2. Ouvre **https://studioweb15.fr/sitemap.xml**  
   - Tu dois voir la liste des URLs (accueil, tarifs, partenaire-local, contact).

---

## 3. Google Search Console (indispensable pour le référencement)

Sans soumission du site et du sitemap, Google peut mettre très longtemps à découvrir le site, voire ne pas l’indexer correctement.

1. Va sur **https://search.google.com/search-console**
2. **Ajouter une propriété** → préfixe d’URL → `https://studioweb15.fr`
3. **Vérifier la propriété**  
   - Choisis la méthode **« Balise HTML »**  
   - Google te donne une balise du type :  
     `<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />`  
   - Récupère uniquement la valeur de `content` (la longue chaîne de caractères).
4. Dans **Vercel** → **Environment Variables**, ajoute :  
   - Nom : `NEXT_PUBLIC_GOOGLE_VERIFICATION`  
   - Valeur : la chaîne `content` (sans les guillemets)  
   - Environnement : **Production**
5. Redéploie le site (ou attends le prochain déploiement).
6. Reviens dans Search Console et clique sur **Vérifier**.
7. Une fois vérifié : **Sitemaps** → ajouter un sitemap → `https://studioweb15.fr/sitemap.xml` → **Envoyer**.

Ensuite, dans **Inspection d’URL**, tu peux demander l’indexation de la page d’accueil pour accélérer la prise en compte.

---

## 4. Ce qui est déjà en place dans le projet

- Métadonnées (titre, description, Open Graph, Twitter) sur toutes les pages
- `robots.txt` généré dynamiquement (autorise `/` en prod, bloque en staging/preview)
- Sitemap XML avec les 4 pages principales
- Données structurées (Organization, LocalBusiness, WebSite) pour les extraits enrichis
- Balise de vérification Google ajoutée automatiquement si `NEXT_PUBLIC_GOOGLE_VERIFICATION` est défini

---

## 5. Délais

- Après soumission du sitemap et éventuelle demande d’indexation, Google peut prendre **quelques jours à quelques semaines** pour faire apparaître le site dans les résultats.
- Pour suivre l’évolution : Google Search Console → **Performances** et **Couverture**.

---

En résumé : **configure `NEXT_PUBLIC_SITE_URL` en prod**, puis **vérifie le site dans Google Search Console** et **soumets le sitemap**. Sans ça, le site peut rester peu ou pas référencé.
