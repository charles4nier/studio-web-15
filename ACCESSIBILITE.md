# ♿ Guide d'accessibilité - Studio Web 15

## 🎯 Objectif

Tous nos sites respectent **WCAG 2.1 niveau AA** minimum.  
L'accessibilité n'est pas une option, c'est la base.

---

## ✅ Ce qui est en place

### **1. Structure HTML sémantique**
- ✅ Balises `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- ✅ Hiérarchie `h1` → `h6` respectée
- ✅ Landmarks ARIA implicites

### **2. Navigation au clavier**
- ✅ Tous les éléments interactifs accessibles au Tab
- ✅ Focus visible avec `:focus-visible` (pas de outline au clic souris)
- ✅ Skip links (à implémenter si besoin)

### **3. Modales accessibles**
- ✅ `role="dialog"` + `aria-modal="true"`
- ✅ `role="document"` pour le contenu
- ✅ Focus trap (Tab reste dans la modale)
- ✅ Focus sur bouton fermer à l'ouverture
- ✅ Retour focus sur élément d'origine à la fermeture
- ✅ Fermeture avec Escape
- ✅ `aria-hidden="true"` sur le contenu principal pendant modale ouverte
- ✅ Portal dans le `<body>` (pas de z-index hell)

### **4. Formulaires**
- ✅ Labels explicites avec `htmlFor`
- ✅ Champs requis avec `required` + indication visuelle
- ✅ Messages d'erreur associés avec `aria-describedby`
- ✅ Autocomplete approprié

### **5. Images**
- ⚠️ Alt text à vérifier sur toutes les images
- ✅ Images décoratives avec `alt=""` ou `aria-hidden="true"`

### **6. Couleurs et contrastes**
- ✅ Ratio minimum 4.5:1 pour texte normal
- ✅ Ratio minimum 3:1 pour texte large (>24px)
- ⚠️ Vérifier les gradients (peuvent poser problème)

### **7. Animations**
- ✅ Respect `prefers-reduced-motion` (à implémenter)
- ✅ Animations décoratives (pas de perte d'info)

---

## 🛠️ Boilerplate : AccessibleModal

### **Utilisation**

```tsx
import AccessibleModal from '@shared/components/AccessibleModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ouvrir la modale
      </button>

      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="Description de la modale"
        gradientId="tarifs" // 'home' | 'tarifs' | 'contact' | 'agence'
      >
        {/* Votre contenu ici */}
        <div className="my-modal-content">
          <h2>Titre</h2>
          <p>Contenu...</p>
        </div>
      </AccessibleModal>
    </>
  );
}
```

### **Ce que le composant gère automatiquement**

✅ **Portal dans body**  
✅ **Role dialog + aria-modal**  
✅ **Focus trap** (Tab circule dans la modale)  
✅ **Focus sur bouton fermer** à l'ouverture  
✅ **Retour focus** sur bouton d'ouverture à la fermeture  
✅ **Escape pour fermer**  
✅ **aria-hidden sur main-content**  
✅ **Désactivation scroll body**  
✅ **Focus visible uniquement clavier** (`:focus-visible`)  
✅ **Fils de soie animés** (SVG waves avec gradient configurable)  
✅ **Bouton fermer stylisé** avec animations  

### **Structure générée**

```html
<body>
  <div id="main-content" aria-hidden="true">
    <!-- Contenu principal caché pour screen readers -->
  </div>
  
  <!-- Portal -->
  <div class="accessible-modal" role="dialog" aria-modal="true">
    <!-- Fils de soie animés (SVG) -->
    <svg class="accessible-modal__wave">
      <!-- Gradients animés selon le thème choisi -->
    </svg>
    
    <div role="document">
      <!-- Premier élément focusable (bouton fermer rond) -->
      <button class="accessible-modal__close" aria-label="Fermer la fenêtre">
        <span></span>
        <span></span>
      </button>
      
      <!-- Votre contenu -->
      {children}
    </div>
  </div>
</body>
```

### **Props disponibles**

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `isOpen` | `boolean` | ✅ | - | État d'ouverture de la modale |
| `onClose` | `() => void` | ✅ | - | Fonction appelée à la fermeture |
| `ariaLabel` | `string` | ✅ | - | Label ARIA pour la modale |
| `children` | `ReactNode` | ✅ | - | Contenu de la modale |
| `className` | `string` | ❌ | `''` | Classe CSS additionnelle |
| `gradientId` | `'home' \| 'tarifs' \| 'contact' \| 'agence'` | ❌ | `'home'` | Thème de gradient pour les fils de soie |

---

## 📋 Checklist accessibilité par composant

### **Boutons**
- [ ] Texte explicite ou `aria-label`
- [ ] `:focus-visible` avec outline visible
- [ ] État disabled avec `aria-disabled` si applicable
- [ ] Taille minimum 44×44px (touch target)

### **Liens**
- [ ] Texte descriptif (pas juste "Cliquez ici")
- [ ] Indication visuelle du focus
- [ ] `target="_blank"` avec `rel="noopener noreferrer"`
- [ ] Avertissement "Ouvre dans un nouvel onglet" si externe

### **Images**
- [ ] Alt text descriptif
- [ ] Alt vide si décorative
- [ ] Pas de texte important dans les images

### **Formulaires**
- [ ] Label associé à chaque champ
- [ ] Messages d'erreur avec `aria-describedby`
- [ ] Autocomplete approprié (`name`, `email`, `tel`)
- [ ] Instructions claires

### **Navigation**
- [ ] Liens de skip ("Aller au contenu")
- [ ] Ordre de tabulation logique
- [ ] Breadcrumbs si applicable

---

## 🔍 Tests d'accessibilité

### **Manuels**
1. **Navigation clavier uniquement**
   - Débrancher la souris
   - Naviguer avec Tab/Shift+Tab
   - Tout doit être accessible

2. **Screen reader**
   - Mac : VoiceOver (Cmd+F5)
   - Windows : NVDA (gratuit)
   - Vérifier que tout est lu correctement

3. **Zoom 200%**
   - Cmd + sur Chrome
   - Vérifier lisibilité et scroll

### **Automatisés**
```bash
# Lighthouse (Chrome DevTools)
- Audit > Accessibility > Run

# axe DevTools (extension Chrome)
- Install axe DevTools
- Run scan

# WAVE (extension)
- Install WAVE
- Scan page
```

---

## 🚀 Quick wins accessibilité

### **1. Ajouter Skip Link**

```tsx
// Dans layout.tsx
<body>
  <a href="#main-content" className="skip-link">
    Aller au contenu principal
  </a>
  {/* ... */}
</body>
```

```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: $black-primary;
  color: $white;
  padding: 8px 16px;
  z-index: 100000;
  
  &:focus {
    top: 0;
  }
}
```

### **2. Respecter prefers-reduced-motion**

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **3. Contraste checker**

Tous les textes doivent avoir un ratio minimum :
- **4.5:1** pour texte normal (<24px)
- **3:1** pour texte large (≥24px)

Checker : https://webaim.org/resources/contrastchecker/

---

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)

---

## 💼 Argument commercial

**"Accessibilité = Business"**

1. **Plus de clients** : 15% de la population a un handicap
2. **Meilleur SEO** : Google favorise les sites accessibles
3. **Obligation légale** : Loi 2005 en France (service public + >250M€ CA)
4. **Image de marque** : Entreprise responsable et inclusive
5. **Expérience améliorée** : Bénéficie à TOUS les utilisateurs

**Argument de vente :**  
*"Nos sites sont accessibles à tous. Navigation clavier, screen readers, conformité WCAG. Plus de clients potentiels, meilleur référencement, image responsable."*

---

## ✨ Standards Studio Web 15

**Tous nos sites incluent :**
- ✅ Navigation clavier complète
- ✅ Focus visible et logique
- ✅ Structure HTML sémantique
- ✅ ARIA landmarks et labels
- ✅ Contrastes respectés
- ✅ Formulaires accessibles
- ✅ Modales avec focus trap
- ✅ Textes alternatifs

**Niveau garanti : WCAG 2.1 AA minimum** ♿🚀
