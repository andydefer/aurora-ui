# 🌌 Aurora UI

<div align="center">

**Une bibliothèque de composants React complète, accessible et personnalisable - construite avec Tailwind CSS**

[![npm version](https://img.shields.io/npm/v/aurora-ui.svg)](https://www.npmjs.com/package/aurora-ui)
[![npm downloads](https://img.shields.io/npm/dm/aurora-ui.svg)](https://www.npmjs.com/package/aurora-ui)
[![license](https://img.shields.io/npm/l/aurora-ui.svg)](https://github.com/andy-defer/aurora-ui/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)

</div>

---

## 📖 Table des matières

- [Introduction](#-introduction)
- [Installation](#-installation)
- [Composants](#-composants)
  - [Layout](#-composants-de-structure-layout)
  - [Typographie](#-composants-typographiques-typography)
  - [Listes](#-composants-de-liste-lists)
  - [Tableaux](#-composants-de-tableau-tables)
  - [Média & Navigation](#-composants-de-média--navigation-media--navigation)
  - [Formulaires](#-composants-de-formulaire-forms)
  - [Feedback & Notification](#-composants-de-feedback--notification-feedback)
  - [Surface & Overlay](#-composants-de-surface--overlay-surfaceoverlay)
  - [Interactifs](#-composants-interactifs-interactive)
  - [Layout Utilities](#-composants-de-disposition-layout-utilities)
  - [Utilitaires](#-composants-utilitaires-utilities)
  - [SEO & Document](#-composants-de-seo--document-seodocument)
  - [Données](#-composants-de-données-data-display)
- [Props Communes](#-props-communes)
- [Hooks](#-hooks)
- [Structure du Projet](#-structure-de-la-bibliothèque)
- [Personnalisation](#-personnalisation)
- [Exemples](#-exemples)
- [API](#-api-des-composants)
- [Développement](#-développement)
- [Contribution](#-contribution)
- [License](#-license)

---

## ✨ Introduction

**Aurora UI** est une bibliothèque de composants React complète qui illumine votre développement. Construite avec ❤️ par **Andy Defer**, cette librairie s'appuie sur **Tailwind CSS** pour offrir une expérience de développement fluide, des composants accessibles et une personnalisation sans limites.

### Pourquoi Aurora UI ?

| Feature | Description |
|---------|-------------|
| 🎨 **100% personnalisable** | Hérite de votre configuration Tailwind - pas de styles imposés |
| ⚡ **Ultra légère** | Build optimisée avec Tree-shaking pour un bundle minimal |
| ♿ **Accessible** | Composants conformes aux bonnes pratiques ARIA (WAI-ARIA) |
| 📦 **TypeScript** | Typage complet pour une expérience de développement parfaite |
| 🎯 **Moderne** | Construit avec React 18+ et les dernières APIs |
| 📚 **Complète** | Plus de 150+ composants prêts à l'emploi |
| 🔧 **Flexible** | Composants extensibles et composables |

---

## 🚀 Installation

### Prérequis

Assurez-vous que votre projet utilise **React 18+** et **Tailwind CSS 3+**.

```bash
# Si vous n'avez pas encore Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### Installation d'Aurora UI

```bash
npm install aurora-ui
```

### Configuration Tailwind

Ajoutez Aurora UI à votre fichier `tailwind.config.js` :

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/aurora-ui/dist/**/*.{js,mjs}" // 👈 Ajoutez cette ligne
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Import du CSS

```typescript
// Dans votre fichier d'entrée (main.tsx ou App.tsx)
import "aurora-ui/styles.css"
```

---

## 📚 Composants

### 🏗️ COMPOSANTS DE STRUCTURE (Layout)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `Box` | `<div>` | `as`, `padding`, `margin`, `flex`, `grid`, `gap`, `radius` | Conteneur générique polyvalent |
| `Container` | `<div>` | `maxWidth`, `fluid`, `centered`, `padding` | Conteneur responsive avec largeur max |
| `Stack` | `<div>` | `direction`, `spacing`, `wrap`, `align`, `justify` | Disposition verticale/horizontale |
| `Grid` | `<div>` | `columns`, `gap`, `responsive`, `minChildWidth` | Système de grille CSS Grid |
| `Flex` | `<div>` | `align`, `justify`, `wrap`, `gap`, `direction` | Flexbox simplifié |
| `Header` | `<header>` | `sticky`, `fixed`, `transparent`, `height`, `shadow` | En-tête de page |
| `Main` | `<main>` | `ariaLabel`, `fullHeight`, `padding` | Contenu principal |
| `Footer` | `<footer>` | `compact`, `sticky`, `borderTop` | Pied de page |
| `Section` | `<section>` | `title`, `spacing`, `background`, `padding`, `fullWidth` | Section avec titre optionnel |
| `Article` | `<article>` | `author`, `date`, `readingTime`, `image` | Article de blog/contenu |
| `Navigation` | `<nav>` | `orientation`, `ariaLabel`, `items`, `collapsible` | Barre de navigation |
| `Sidebar` | `<aside>` | `position`, `width`, `collapsible`, `open`, `onToggle` | Barre latérale |
| `Drawer` | `<aside>` + Dialog | `anchor`, `open`, `onClose`, `size`, `backdrop` | Panneau latéral coulissant |
| `BottomSheet` | `<div>` + Dialog | `open`, `onClose`, `height`, `draggable`, `snapPoints` | Panneau depuis le bas |
| `SplitPane` | `<div>` | `split`, `minSize`, `maxSize`, `onResize`, `defaultSize` | Panneau divisé redimensionnable |

### 📝 COMPOSANTS TYPOGRAPHIQUES (Typography)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `Heading` | `<h1>` à `<h6>` | `level`, `align`, `color`, `truncate`, `weight` | Titres hiérarchiques |
| `Paragraph` | `<p>` | `align`, `leading`, `size`, `color`, `maxLines` | Paragraphe de texte |
| `Text` | `<span>` | `color`, `size`, `weight`, `align`, `transform`, `truncate` | Texte générique |
| `Title` | `<title>` | `children`, `suffix`, `prefix`, `separator` | Change le titre du document |
| `Strong` | `<strong>` | `weight`, `color` | Texte important (sémantique) |
| `Emphasis` | `<em>` | `italic` | Texte accentué |
| `Bold` | `<b>` | `weight` | Texte gras (non-sémantique) |
| `Italic` | `<i>` | - | Texte italique |
| `Underline` | `<u>` | `pattern`, `thickness` | Texte souligné |
| `Highlight` | `<mark>` | `color`, `backgroundColor`, `rounded` | Texte surligné |
| `SmallText` | `<small>` | `size` | Petit texte (légende) |
| `Lead` | `<p>` | - | Paragraphe d'introduction (plus grand) |
| `Caption` | `<figcaption>` | `align`, `color` | Légende pour média |
| `Kbd` | `<kbd>` | `command`, `keys` | Touche clavier |
| `Code` | `<code>` | `language`, `inline`, `showLineNumbers` | Code source |
| `Preformatted` | `<pre>` | `language`, `wrap`, `maxHeight` | Bloc préformaté |
| `Blockquote` | `<blockquote>` | `author`, `cite`, `align` | Citation longue |
| `InlineQuote` | `<q>` | `cite` | Citation courte |
| `Citation` | `<cite>` | `url`, `title` | Référence/citation d'œuvre |
| `Abbreviation` | `<abbr>` | `title`, `label` | Abréviation avec tooltip |
| `Address` | `<address>` | `icon`, `inline` | Informations de contact |
| `Variable` | `<var>` | `math`, `value` | Variable mathématique |
| `SampleOutput` | `<samp>` | - | Exemple de sortie programme |

### 📋 COMPOSANTS DE LISTE (Lists)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `UnorderedList` | `<ul>` | `bulletStyle`, `spacing`, `nested` | Liste à puces |
| `OrderedList` | `<ol>` | `numberStyle`, `start`, `reversed`, `type` | Liste numérotée |
| `ListItem` | `<li>` | `value`, `active`, `disabled`, `icon` | Élément de liste |
| `DescriptionList` | `<dl>` | `horizontal`, `compact`, `termWidth` | Liste de définitions |
| `DescriptionTerm` | `<dt>` | `required` | Terme à définir |
| `DescriptionDetails` | `<dd>` | `indent` | Définition/détail |

### 📊 COMPOSANTS DE TABLEAU (Tables)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `Table` | `<tr>` | `bordered`, `striped`, `hoverable`, `responsive`, `compact` | Tableau de données |
| `TableHead` | `<thead>` | `sticky` | En-tête de tableau |
| `TableBody` | `<tbody>` | - | Corps du tableau |
| `TableFoot` | `<tfoot>` | - | Pied de tableau |
| `TableRow` | `<tr>` | `selected`, `disabled`, `clickable` | Ligne de tableau |
| `TableHeader` | `<th>` | `sortable`, `sorted`, `width`, `align`, `colspan` | Cellule d'en-tête |
| `TableCell` | `<td>` | `align`, `colspan`, `rowspan`, `truncate` | Cellule standard |
| `TableCaption` | `<caption>` | `side`, `align` | Titre du tableau |
| `DataTable` | `</table>` + features | `data`, `columns`, `sorting`, `filtering`, `pagination`, `selection` | Tableau avancé avec fonctionnalités |

### 🔗 COMPOSANTS DE MÉDIA & NAVIGATION (Media & Navigation)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `Link` | `<a>` | `href`, `target`, `rel`, `download`, `active`, `underline` | Lien hypertexte |
| `NavLink` | `<a>` | `to`, `exact`, `activeClassName`, `isActive` | Lien de navigation (React Router) |
| `Breadcrumb` | `<nav>` + `<a>` | `items`, `separator`, `maxItems`, `truncate` | Fil d'Ariane |
| `Pagination` | `<nav>` | `current`, `total`, `onChange`, `siblings`, `boundaries` | Pagination |
| `Image` | `<img>` | `src`, `alt`, `width`, `height`, `lazy`, `fallback`, `objectFit`, `placeholder` | Image optimisée |
| `Avatar` | `<img>` | `src`, `name`, `size`, `shape`, `fallback`, `status` | Avatar utilisateur |
| `Picture` | `<picture>` | `sources`, `fallback`, `mediaQueries` | Images responsives |
| `Figure` | `<figure>` | `caption`, `align`, `zoomable` | Figure avec légende |
| `Video` | `<video>` | `src`, `controls`, `autoplay`, `loop`, `muted`, `poster`, `thumbnail` | Lecteur vidéo |
| `Audio` | `<audio>` | `src`, `controls`, `autoplay`, `loop`, `muted` | Lecteur audio |
| `Icon` | `<svg>` | `name`, `size`, `color`, `stroke`, `fill`, `rotate` | Icône SVG |
| `IconButton` | `<button>` + `<svg>` | `icon`, `label`, `variant`, `size`, `loading` | Bouton avec icône |
| `LazyImage` | `<img>` | `src`, `alt`, `threshold`, `placeholder`, `effect` | Image avec lazy loading et effet |

### 📝 COMPOSANTS DE FORMULAIRE (Forms)

| Composant | Balise HTML | Props principales | Description |
|-----------|-------------|-------------------|-------------|
| `Form` | `<form>` | `onSubmit`, `method`, `noValidate`, `validationMode` | Formulaire avec validation |
| `Input` | `<input>` | `type`, `name`, `value`, `onChange`, `placeholder`, `error`, `label`, `leftIcon`, `rightIcon` | Champ de saisie |
| `Textarea` | `<textarea>` | `name`, `value`, `onChange`, `rows`, `resize`, `autoResize`, `maxRows` | Zone de texte multiligne |
| `Select` | `<select>` | `name`, `value`, `onChange`, `options`, `placeholder`, `searchable`, `clearable` | Liste déroulante |
| `MultiSelect` | `<select multiple>` | `value`, `options`, `onChange`, `maxSelected`, `tagLimit` | Sélection multiple |
| `Checkbox` | `<input type="checkbox">` | `checked`, `onChange`, `label`, `indeterminate`, `size` | Case à cocher |
| `CheckboxGroup` | `<div>` | `value`, `options`, `onChange`, `orientation` | Groupe de cases à cocher |
| `Radio` | `<input type="radio">` | `checked`, `onChange`, `label`, `value`, `name` | Bouton radio |
| `RadioGroup` | `<div>` | `value`, `options`, `onChange`, `orientation`, `name` | Groupe de boutons radio |
| `Switch` | `<button>` | `checked`, `onChange`, `label`, `size`, `disabled` | Interrupteur toggle |
| `Button` | `<button>` | `variant`, `size`, `loading`, `disabled`, `icon`, `fullWidth` | Bouton d'action |
| `ButtonGroup` | `<div>` | `items`, `variant`, `size`, `orientation`, `selected` | Groupe de boutons |
| `Label` | `<label>` | `htmlFor`, `required`, `optional`, `tooltip`, `hidden` | Étiquette de champ |
| `Fieldset` | `<fieldset>` | `legend`, `disabled`, `border` | Groupe de champs |
| `Legend` | `<legend>` | - | Légende du fieldset |
| `Datalist` | `<datalist>` | `id`, `options`, `onSearch` | Liste d'options auto-complétion |
| `Output` | `<output>` | `htmlFor`, `value`, `format` | Résultat de calcul |
| `Progress` | `<progress>` | `value`, `max`, `label`, `showValue`, `animated` | Barre de progression |
| `Meter` | `<meter>` | `value`, `min`, `max`, `low`, `high`, `optimum`, `label` | Jauge de mesure |
| `Slider` | `<input type="range">` | `value`, `onChange`, `min`, `max`, `step`, `marks`, `tooltip` | Curseur/range slider |
| `Rating` | `<div>` | `value`, `onChange`, `max`, `size`, `readonly`, `precision` | Système d'étoiles/notation |
| `DatePicker` | `<input type="date">` | `value`, `onChange`, `min`, `max`, `format`, `locale` | Sélecteur de date |
| `TimePicker` | `<input type="time">` | `value`, `onChange`, `min`, `max`, `step`, `format` | Sélecteur d'heure |
| `DateTimePicker` | `<input>` | `value`, `onChange`, `dateFormat`, `timeFormat`, `locale` | Sélecteur date+heure |
| `FileUpload` | `<input type="file">` | `accept`, `multiple`, `onChange`, `maxSize`, `preview` | Upload de fichiers |
| `Toggle` | `<button>` | `checked`, `onChange`, `labels`, `size` | Toggle binaire |

### 🎨 COMPOSANTS DE FEEDBACK & NOTIFICATION (Feedback)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Alert` | `variant`, `title`, `children`, `closable`, `icon` | Message d'alerte/success/error/warning/info |
| `Toast` | `message`, `type`, `duration`, `position`, `onClose` | Notification temporaire |
| `ToastContainer` | `position`, `limit`, `autoClose`, `newestOnTop` | Conteneur de toasts |
| `Snackbar` | `message`, `action`, `duration`, `open`, `onClose` | Barre de notification (bas) |
| `ProgressBar` | `value`, `max`, `variant`, `animated`, `striped`, `label` | Barre de progression linéaire |
| `CircularProgress` | `value`, `size`, `thickness`, `variant`, `label` | Indicateur circulaire |
| `Skeleton` | `variant`, `width`, `height`, `count`, `animated`, `circle` | Placeholder de chargement |
| `Spinner` | `size`, `color`, `thickness`, `label` | Indicateur de chargement rotatif |
| `Badge` | `children`, `count`, `variant`, `dot`, `max`, `overlap` | Badge/indicateur numérique |
| `Chip` | `label`, `onDelete`, `avatar`, `variant`, `clickable`, `icon` | Élement compact (tag) |
| `Tooltip` | `content`, `children`, `position`, `delay`, `arrow` | Info-bulle au survol |
| `Popover` | `content`, `children`, `position`, `trigger`, `open`, `onClose` | Popup contextuelle |

### 🎮 COMPOSANTS DE SURFACE & OVERLAY (Surface/Overlay)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Card` | `children`, `padding`, `shadow`, `radius`, `border`, `hoverable` | Carte conteneur |
| `Accordion` | `items`, `multiple`, `defaultOpen`, `onChange` | Panneau extensible multiple |
| `AccordionItem` | `title`, `children`, `open`, `onToggle`, `icon` | Élément d'accordéon |
| `Tabs` | `items`, `activeTab`, `onChange`, `orientation`, `variant` | Onglets de navigation |
| `Tab` | `label`, `disabled`, `icon`, `badge` | Élément d'onglet |
| `Modal` | `open`, `onClose`, `title`, `children`, `size`, `closeOnBackdrop`, `scrollable` | Fenêtre modale (dialog) |
| `Dialog` | `open`, `onClose`, `title`, `description`, `actions`, `size` | Boîte de dialogue standard |
| `AlertDialog` | `open`, `onClose`, `title`, `description`, `confirmText`, `cancelText`, `onConfirm` | Dialogue de confirmation |
| `Drawer` | `open`, `onClose`, `anchor`, `size`, `variant` | Panneau latéral coulissant |
| `BottomSheet` | `open`, `onClose`, `height`, `snapPoints`, `draggable`, `detent` | Panneau depuis le bas |
| `SideSheet` | `open`, `onClose`, `side`, `width`, `overlay` | Panneau latéral |
| `Popover` | `open`, `onClose`, `anchorEl`, `placement`, `offset` | Popover contextuel |
| `Menu` | `open`, `anchorEl`, `onClose`, `items`, `placement` | Menu déroulant |
| `Dropdown` | `trigger`, `items`, `placement`, `onSelect` | Liste déroulante |
| `ContextMenu` | `items`, `onClose`, `position` | Menu contextuel (clic droit) |

### 🎯 COMPOSANTS INTERACTIFS (Interactive)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Details` | `summary`, `children`, `open`, `onToggle`, `icon` | Détails révélables |
| `Summary` | `children`, `icon`, `className` | Résumé visible |
| `Toolbar` | `children`, `orientation`, `dense`, `variant` | Barre d'outils |
| `MenuBar` | `items`, `orientation`, `onSelect` | Barre de menu |
| `CommandPalette` | `open`, `onClose`, `commands`, `placeholder`, `onSelect` | Palette de commandes (Cmd+K) |
| `Hotkey` | `keys`, `callback`, `description`, `label` | Raccourci clavier |
| `Resizable` | `children`, `direction`, `minWidth`, `maxWidth`, `onResize` | Panneau redimensionnable |
| `Draggable` | `children`, `axis`, `disabled`, `onDrag`, `onStop` | Élément déplaçable |
| `Droppable` | `children`, `disabled`, `onDrop`, `onDragOver` | Zone déposable |

### 📐 COMPOSANTS DE DISPOSITION (Layout Utilities)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Container` | `maxWidth`, `fluid`, `centered`, `gutters` | Conteneur principal |
| `Row` | `align`, `justify`, `wrap`, `gap` | Ligne flexbox |
| `Column` | `span`, `offset`, `order`, `pull`, `push` | Colonne de grille |
| `Spacer` | `size`, `axis` | Espaceur flexible |
| `Divider` | `orientation`, `variant`, `text`, `thickness` | Séparateur |
| `AspectRatio` | `ratio`, `children`, `width`, `height` | Ratio d'aspect |
| `Center` | `children`, `axis`, `centerText` | Centrage de contenu |
| `Stack` | `spacing`, `direction`, `wrap`, `divider` | Pile de composants espacés |
| `Wrap` | `spacing`, `justify`, `align`, `children` | Wrap flex |

### 🔧 COMPOSANTS UTILITAIRES (Utilities)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Portal` | `children`, `container`, `disabled` | Render dans un autre DOM node |
| `FocusTrap` | `children`, `active`, `initialFocus`, `returnFocus` | Piège à focus (accessibilité) |
| `ScrollLock` | `children`, `enabled`, `target` | Verrouillage du scroll |
| `IntersectionObserver` | `children`, `onIntersect`, `threshold`, `once` | Observateur d'intersection |
| `VirtualList` | `items`, `height`, `itemHeight`, `overscan`, `renderItem` | Liste virtuelle (performance) |
| `InfiniteScroll` | `hasMore`, `loadMore`, `threshold`, `children` | Défilement infini |
| `LazyLoad` | `children`, `offset`, `placeholder`, `once` | Chargement paresseux |
| `ErrorBoundary` | `children`, `fallback`, `onError` | Capture d'erreurs React |
| `Suspense` | `fallback`, `children` | Suspense natif React |

### 🌍 COMPOSANTS DE SEO & DOCUMENT (SEO/Document)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Title` | `children`, `suffix`, `prefix`, `template` | Change le titre document |
| `MetaTags` | `title`, `description`, `keywords`, `author`, `robots`, `canonical` | Balises meta SEO |
| `OpenGraph` | `title`, `description`, `image`, `url`, `type`, `siteName` | Balises Open Graph |
| `TwitterCard` | `card`, `site`, `title`, `description`, `image` | Twitter Card |
| `JsonLd` | `data`, `type` | Données structurées Schema.org |
| `Helmet` | `children` | Gestionnaire de balises `<head>` |

### 📊 COMPOSANTS DE DONNÉES (Data Display)

| Composant | Props principales | Description |
|-----------|------------------|-------------|
| `Statistic` | `value`, `label`, `prefix`, `suffix`, `trend` | Valeur statistique |
| `Counter` | `value`, `from`, `duration`, `format`, `decimals` | Compteur animé |
| `Timeline` | `items`, `orientation`, `alternate`, `color` | Ligne de temps |
| `Carousel` | `items`, `autoplay`, `interval`, `indicators`, `navigation`, `loop` | Carrousel |
| `Stepper` | `steps`, `active`, `orientation`, `alternativeLabel` | Indicateur d'étapes |
| `Steps` | `current`, `items`, `orientation`, `statusIcons` | Étapes de processus |
| `Tree` | `data`, `renderNode`, `expandAll`, `onSelect`, `onToggle` | Vue arborescente |
| `TreeView` | `nodes`, `selected`, `expanded`, `onToggle`, `onSelect` | Vue d'arbre interactive |
| `Collapse` | `in`, `children`, `timeout`, `dimension`, `appear` | Animation de collapse |

---

## 🎨 Props Communes

Tous les composants héritent de ces props de base :

```typescript
interface BaseProps {
  /** Identifiant unique */
  id?: string;
  /** Classes CSS additionnelles */
  className?: string;
  /** Styles inline */
  style?: React.CSSProperties;
  /** Attributs data-* personnalisés */
  dataAttr?: Record<string, string | number>;
  /** ARIA label */
  ariaLabel?: string;
  /** ARIA describedby */
  ariaDescribedBy?: string;
  /** ARIA hidden */
  ariaHidden?: boolean;
  /** Rôle ARIA */
  role?: string;
  /** ID pour tests */
  testId?: string;
  /** HTML hidden */
  hidden?: boolean;
  /** Tab index */
  tabIndex?: number;
}
```

```typescript
interface StylableProps {
  /** Taille (xs, sm, md, lg, xl) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Variante de style */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  /** Désactivé */
  disabled?: boolean;
  /** En chargement */
  loading?: boolean;
  /** Pleine largeur */
  fullWidth?: boolean;
  /** Composant racine (as) */
  as?: React.ElementType;
}
```

---

## 🪝 Hooks

Aurora UI fournit également des hooks utilitaires :

| Hook | Description |
|------|-------------|
| `useClickOutside` | Détecte les clics à l'extérieur d'un élément |
| `useKeyPress` | Détecte les pressions de touches |
| `useLocalStorage` | Persiste des données dans localStorage |
| `useMediaQuery` | Réagit aux media queries |
| `useToast` | Gère les notifications toast |
| `useModal` | Gère l'état des modales |
| `useForm` | Gère la validation des formulaires |
| `useDisclosure` | Gère les états ouverts/fermés |
| `useDebounce` | Debounce les valeurs |
| `useThrottle` | Throttle les appels de fonction |

---

## 📦 Structure de la bibliothèque

```
aurora-ui/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── typography/
│   │   ├── forms/
│   │   ├── feedback/
│   │   ├── overlay/
│   │   ├── navigation/
│   │   ├── data/
│   │   ├── media/
│   │   └── utilities/
│   ├── hooks/
│   │   ├── useClickOutside.ts
│   │   ├── useKeyPress.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useToast.ts
│   │   ├── useModal.ts
│   │   └── useForm.ts
│   ├── themes/
│   │   ├── defaultTheme.ts
│   │   ├── darkTheme.ts
│   │   └── ThemeProvider.tsx
│   ├── utils/
│   │   ├── clsx.ts
│   │   ├── formatDate.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 Personnalisation

### Avec les props

Chaque composant accepte des props de personnalisation :

```tsx
<Button 
  variant="primary" 
  size="lg" 
  fullWidth 
  loading
>
  Chargement en cours
</Button>
```

### Avec className (Tailwind)

Comme tous les composants héritent de `className`, vous pouvez surcharger les styles avec Tailwind :

```tsx
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Bouton personnalisé
</Button>
```

### Thème personnalisé

Aurora UI utilise automatiquement vos tokens Tailwind (couleurs, espacements, etc.). Aucune configuration supplémentaire n'est nécessaire !

---

## 💡 Exemples

### Formulaire d'inscription complet

```tsx
import { Card, Input, Button, Alert } from "aurora-ui"
import { useState } from "react"

function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Logique d'inscription
      await register()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <Heading level={2} className="mb-6">Inscription</Heading>
      
      {error && <Alert variant="error" className="mb-4">{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Input 
          label="Email" 
          type="email" 
          required 
          className="mb-4"
        />
        <Input 
          label="Mot de passe" 
          type="password" 
          required 
          className="mb-4"
        />
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          loading={loading}
        >
          S'inscrire
        </Button>
      </form>
    </Card>
  )
}
```

### Modal avec confirmation

```tsx
import { Button, Modal } from "aurora-ui"

function DeleteButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    console.log("Supprimé")
    setIsOpen(false)
  }

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Supprimer
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation"
        description="Êtes-vous sûr de vouloir supprimer cet élément ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDelete}
      />
    </>
  )
}
```

### Layout responsive avec Stack et Grid

```tsx
import { Stack, Grid, Card, Text } from "aurora-ui"

function Dashboard() {
  return (
    <Stack direction="col" spacing="lg" className="p-8">
      <Heading level={1}>Dashboard</Heading>
      
      <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="md">
        <Card>
          <Text weight="bold">Total Utilisateurs</Text>
          <Text size="2xl">1,234</Text>
        </Card>
        <Card>
          <Text weight="bold">Revenus</Text>
          <Text size="2xl">€12,345</Text>
        </Card>
        <Card>
          <Text weight="bold">Taux de conversion</Text>
          <Text size="2xl">23.5%</Text>
        </Card>
      </Grid>
    </Stack>
  )
}
```

---

## 🔧 API des composants principaux

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Style du bouton |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| fullWidth | `boolean` | `false` | Prend toute la largeur |
| loading | `boolean` | `false` | Affiche un spinner |
| disabled | `boolean` | `false` | Désactive le bouton |
| leftIcon | `ReactNode` | - | Icône à gauche |
| rightIcon | `ReactNode` | - | Icône à droite |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Étiquette du champ |
| error | `string` | - | Message d'erreur |
| leftIcon | `ReactNode` | - | Icône à gauche |
| rightIcon | `ReactNode` | - | Icône à droite |
| required | `boolean` | `false` | Champ requis |

---

## 🛠️ Développement

### Cloner le projet

```bash
git clone https://github.com/andy-defer/aurora-ui.git
cd aurora-ui
npm install
```

### Lancer en développement

```bash
npm run dev
```

### Build pour la production

```bash
npm run build
npm run build:css
```

### Lancer les tests

```bash
npm test
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Guidelines

- Suivez les conventions de code TypeScript
- Écrivez des tests pour les nouveaux composants
- Documentez les props avec JSDoc
- Assurez-vous que tous les tests passent

---

## 📝 Changelog

### v0.1.0 (2026-05-06)

- ✨ Sortie initiale de la bibliothèque
- 🎨 150+ composants React
- 📚 Documentation complète
- 🎯 Support TypeScript
- ⚡ Build optimisée avec Tree-shaking

---

## 📄 License

MIT © [Andy Defer](https://github.com/andy-defer)

---


**Illuminez vos interfaces avec Aurora UI** ✨

[Report Bug](https://github.com/andy-defer/aurora-ui/issues) · [Request Feature](https://github.com/andy-defer/aurora-ui/issues) · [Documentation](https://aurora-ui.andy-defer.dev)
