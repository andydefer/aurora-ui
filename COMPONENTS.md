## 📋 Liste complète des 161 composants Aurora UI

---

### 🏗️ LAYOUT (Structure) - `src/components/layout/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 1 | `Box` | Conteneur générique polyvalent | `Box({ as?, padding?, margin?, flex?, grid?, gap?, radius?, className?, style?, children? })` |
| 2 | `Container` | Conteneur responsive avec largeur max | `Container({ maxWidth?, fluid?, centered?, padding?, className?, style?, children? })` |
| 3 | `Stack` | Disposition verticale/horizontale | `Stack({ direction?, spacing?, wrap?, align?, justify?, className?, style?, children? })` |
| 4 | `Grid` | Système de grille CSS Grid | `Grid({ columns?, gap?, responsive?, minChildWidth?, className?, style?, children? })` |
| 5 | `Flex` | Flexbox simplifié | `Flex({ align?, justify?, wrap?, gap?, direction?, className?, style?, children? })` |
| 6 | `Header` | En-tête de page | `Header({ sticky?, fixed?, transparent?, height?, shadow?, className?, style?, children? })` |
| 7 | `Main` | Contenu principal | `Main({ ariaLabel?, fullHeight?, padding?, className?, style?, children? })` |
| 8 | `Footer` | Pied de page | `Footer({ compact?, sticky?, borderTop?, className?, style?, children? })` |
| 9 | `Section` | Section avec titre optionnel | `Section({ title?, spacing?, background?, padding?, fullWidth?, className?, style?, children? })` |
| 10 | `Article` | Article de blog/contenu | `Article({ author?, date?, readingTime?, image?, className?, style?, children? })` |
| 11 | `Navigation` | Barre de navigation | `Navigation({ orientation?, ariaLabel?, items?, collapsible?, className?, style?, children? })` |
| 12 | `Sidebar` | Barre latérale | `Sidebar({ position?, width?, collapsible?, open?, onToggle?, className?, style?, children? })` |
| 13 | `Drawer` | Panneau latéral coulissant | `Drawer({ anchor?, open?, onClose?, size?, backdrop?, className?, style?, children? })` |
| 14 | `BottomSheet` | Panneau depuis le bas | `BottomSheet({ open?, onClose?, height?, draggable?, snapPoints?, className?, style?, children? })` |
| 15 | `SplitPane` | Panneau divisé redimensionnable | `SplitPane({ split?, minSize?, maxSize?, onResize?, defaultSize?, className?, style?, children? })` |

---

### 📝 TYPOGRAPHY (Typographie) - `src/components/typography/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 16 | `Heading` | Titres hiérarchiques | `Heading({ level?, align?, color?, truncate?, weight?, className?, style?, children? })` |
| 17 | `Paragraph` | Paragraphe de texte | `Paragraph({ align?, leading?, size?, color?, maxLines?, className?, style?, children? })` |
| 18 | `Text` | Texte générique | `Text({ color?, size?, weight?, align?, transform?, truncate?, className?, style?, children? })` |
| 19 | `Title` | Change le titre du document | `Title({ children?, suffix?, prefix?, separator? })` |
| 20 | `Strong` | Texte important (sémantique) | `Strong({ weight?, color?, className?, style?, children? })` |
| 21 | `Emphasis` | Texte accentué | `Emphasis({ italic?, className?, style?, children? })` |
| 22 | `Bold` | Texte gras (non-sémantique) | `Bold({ weight?, className?, style?, children? })` |
| 23 | `Italic` | Texte italique | `Italic({ className?, style?, children? })` |
| 24 | `Underline` | Texte souligné | `Underline({ pattern?, thickness?, className?, style?, children? })` |
| 25 | `Highlight` | Texte surligné | `Highlight({ color?, backgroundColor?, rounded?, className?, style?, children? })` |
| 26 | `SmallText` | Petit texte (légende) | `SmallText({ size?, className?, style?, children? })` |
| 27 | `Lead` | Paragraphe d'introduction (plus grand) | `Lead({ className?, style?, children? })` |
| 28 | `Caption` | Légende pour média | `Caption({ align?, color?, className?, style?, children? })` |
| 29 | `Kbd` | Touche clavier | `Kbd({ command?, keys?, className?, style?, children? })` |
| 30 | `Code` | Code source | `Code({ language?, inline?, showLineNumbers?, className?, style?, children? })` |
| 31 | `Preformatted` | Bloc préformaté | `Preformatted({ language?, wrap?, maxHeight?, className?, style?, children? })` |
| 32 | `Blockquote` | Citation longue | `Blockquote({ author?, cite?, align?, className?, style?, children? })` |
| 33 | `InlineQuote` | Citation courte | `InlineQuote({ cite?, className?, style?, children? })` |
| 34 | `Citation` | Référence/citation d'œuvre | `Citation({ url?, title?, className?, style?, children? })` |
| 35 | `Abbreviation` | Abréviation avec tooltip | `Abbreviation({ title?, label?, className?, style?, children? })` |
| 36 | `Address` | Informations de contact | `Address({ icon?, inline?, className?, style?, children? })` |
| 37 | `Variable` | Variable mathématique | `Variable({ math?, value?, className?, style?, children? })` |
| 38 | `SampleOutput` | Exemple de sortie programme | `SampleOutput({ className?, style?, children? })` |

---

### 📋 LISTS (Listes) - `src/components/lists/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 39 | `UnorderedList` | Liste à puces | `UnorderedList({ bulletStyle?, spacing?, nested?, className?, style?, children? })` |
| 40 | `OrderedList` | Liste numérotée | `OrderedList({ numberStyle?, start?, reversed?, type?, className?, style?, children? })` |
| 41 | `ListItem` | Élément de liste | `ListItem({ value?, active?, disabled?, icon?, className?, style?, children? })` |
| 42 | `DescriptionList` | Liste de définitions | `DescriptionList({ horizontal?, compact?, termWidth?, className?, style?, children? })` |
| 43 | `DescriptionTerm` | Terme à définir | `DescriptionTerm({ required?, className?, style?, children? })` |
| 44 | `DescriptionDetails` | Définition/détail | `DescriptionDetails({ indent?, className?, style?, children? })` |

---

### 📊 TABLES (Tableaux) - `src/components/tables/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 45 | `Table` | Tableau de données | `Table({ bordered?, striped?, hoverable?, responsive?, compact?, className?, style?, children? })` |
| 46 | `TableHead` | En-tête de tableau | `TableHead({ sticky?, className?, style?, children? })` |
| 47 | `TableBody` | Corps du tableau | `TableBody({ className?, style?, children? })` |
| 48 | `TableFoot` | Pied de tableau | `TableFoot({ className?, style?, children? })` |
| 49 | `TableRow` | Ligne de tableau | `TableRow({ selected?, disabled?, clickable?, className?, style?, children? })` |
| 50 | `TableHeader` | Cellule d'en-tête | `TableHeader({ sortable?, sorted?, width?, align?, colspan?, className?, style?, children? })` |
| 51 | `TableCell` | Cellule standard | `TableCell({ align?, colspan?, rowspan?, truncate?, className?, style?, children? })` |
| 52 | `TableCaption` | Titre du tableau | `TableCaption({ side?, align?, className?, style?, children? })` |
| 53 | `DataTable` | Tableau avancé avec fonctionnalités | `DataTable({ data?, columns?, sorting?, filtering?, pagination?, selection?, className?, style? })` |

---

### 🔗 MEDIA & NAVIGATION - `src/components/navigation/` & `src/components/media/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 54 | `Link` | Lien hypertexte | `Link({ href?, target?, rel?, download?, active?, underline?, className?, style?, children? })` |
| 55 | `NavLink` | Lien de navigation (React Router) | `NavLink({ to?, exact?, activeClassName?, isActive?, className?, style?, children? })` |
| 56 | `Breadcrumb` | Fil d'Ariane | `Breadcrumb({ items?, separator?, maxItems?, truncate?, className?, style? })` |
| 57 | `Pagination` | Pagination | `Pagination({ current?, total?, onChange?, siblings?, boundaries?, className?, style? })` |
| 58 | `Image` | Image optimisée | `Image({ src?, alt?, width?, height?, lazy?, fallback?, objectFit?, placeholder?, className?, style? })` |
| 59 | `Avatar` | Avatar utilisateur | `Avatar({ src?, name?, size?, shape?, fallback?, status?, className?, style? })` |
| 61 | `Figure` | Figure avec légende | `Figure({ caption?, align?, zoomable?, className?, style?, children? })` |
| 62 | `Video` | Lecteur vidéo | `Video({ src?, controls?, autoplay?, loop?, muted?, poster?, thumbnail?, className?, style? })` |
| 63 | `Audio` | Lecteur audio | `Audio({ src?, controls?, autoplay?, loop?, muted?, className?, style? })` |
| 64 | `Icon` | Icône SVG | `Icon({ name?, size?, color?, stroke?, fill?, rotate?, className?, style? })` |

---

### 📝 FORMS (Formulaires) - `src/components/forms/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 67 | `Form` | Formulaire avec validation | `Form({ onSubmit?, method?, noValidate?, validationMode?, className?, style?, children? })` |
| 68 | `Input` | Champ de saisie | `Input({ type?, name?, value?, onChange?, placeholder?, error?, label?, leftIcon?, rightIcon?, className?, style? })` |
| 69 | `Textarea` | Zone de texte multiligne | `Textarea({ name?, value?, onChange?, rows?, resize?, autoResize?, maxRows?, className?, style? })` |
| 70 | `Select` | Liste déroulante | `Select({ name?, value?, onChange?, options?, placeholder?, searchable?, clearable?, className?, style? })` |
| 71 | `MultiSelect` | Sélection multiple | `MultiSelect({ value?, options?, onChange?, maxSelected?, tagLimit?, className?, style? })` |
| 72 | `Checkbox` | Case à cocher | `Checkbox({ checked?, onChange?, label?, indeterminate?, size?, className?, style? })` |
| 73 | `CheckboxGroup` | Groupe de cases à cocher | `CheckboxGroup({ value?, options?, onChange?, orientation?, className?, style? })` |
| 74 | `Radio` | Bouton radio | `Radio({ checked?, onChange?, label?, value?, name?, className?, style? })` |
| 75 | `RadioGroup` | Groupe de boutons radio | `RadioGroup({ value?, options?, onChange?, orientation?, name?, className?, style? })` |
| 76 | `Switch` | Interrupteur toggle | `Switch({ checked?, onChange?, label?, size?, disabled?, className?, style? })` |
| 77 | `Button` | Bouton d'action | `Button({ variant?, size?, loading?, disabled?, icon?, fullWidth?, className?, style?, onClick?, children? })` |
| 78 | `ButtonGroup` | Groupe de boutons | `ButtonGroup({ items?, variant?, size?, orientation?, selected?, className?, style? })` |
| 79 | `Label` | Étiquette de champ | `Label({ htmlFor?, required?, optional?, tooltip?, hidden?, className?, style?, children? })` |
| 80 | `Fieldset` | Groupe de champs | `Fieldset({ legend?, disabled?, border?, className?, style?, children? })` |
| 81 | `Legend` | Légende du fieldset | `Legend({ className?, style?, children? })` |
| 82 | `Datalist` | Liste d'options auto-complétion | `Datalist({ id?, options?, onSearch?, className?, style? })` |
| 83 | `Output` | Résultat de calcul | `Output({ htmlFor?, value?, format?, className?, style? })` |
| 84 | `Progress` | Barre de progression | `Progress({ value?, max?, label?, showValue?, animated?, className?, style? })` |
| 85 | `Meter` | Jauge de mesure | `Meter({ value?, min?, max?, low?, high?, optimum?, label?, className?, style? })` |
| 86 | `Slider` | Curseur/range slider | `Slider({ value?, onChange?, min?, max?, step?, marks?, tooltip?, className?, style? })` |
| 87 | `Rating` | Système d'étoiles/notation | `Rating({ value?, onChange?, max?, size?, readonly?, precision?, className?, style? })` |
| 88 | `DatePicker` | Sélecteur de date | `DatePicker({ value?, onChange?, min?, max?, format?, locale?, className?, style? })` |
| 89 | `TimePicker` | Sélecteur d'heure | `TimePicker({ value?, onChange?, min?, max?, step?, format?, className?, style? })` |
| 90 | `DateTimePicker` | Sélecteur date+heure | `DateTimePicker({ value?, onChange?, dateFormat?, timeFormat?, locale?, className?, style? })` |
| 91 | `FileUpload` | Upload de fichiers | `FileUpload({ accept?, multiple?, onChange?, maxSize?, preview?, className?, style? })` |
| 92 | `Toggle` | Toggle binaire | `Toggle({ checked?, onChange?, labels?, size?, className?, style? })` |

---

### 🎨 FEEDBACK & NOTIFICATION - `src/components/feedback/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 93 | `Alert` | Message d'alerte | `Alert({ variant?, title?, children?, closable?, icon?, className?, style? })` |
| 94 | `Toast` | Notification temporaire | `Toast({ message?, type?, duration?, position?, onClose?, className?, style? })` |
| 95 | `ToastContainer` | Conteneur de toasts | `ToastContainer({ position?, limit?, autoClose?, newestOnTop?, className?, style? })` |
| 96 | `Snackbar` | Barre de notification (bas) | `Snackbar({ message?, action?, duration?, open?, onClose?, className?, style? })` |
| 97 | `ProgressBar` | Barre de progression linéaire | `ProgressBar({ value?, max?, variant?, animated?, striped?, label?, className?, style? })` |
| 98 | `CircularProgress` | Indicateur circulaire | `CircularProgress({ value?, size?, thickness?, variant?, label?, className?, style? })` |
| 99 | `Skeleton` | Placeholder de chargement | `Skeleton({ variant?, width?, height?, count?, animated?, circle?, className?, style? })` |
| 100 | `Spinner` | Indicateur de chargement rotatif | `Spinner({ size?, color?, thickness?, label?, className?, style? })` |
| 101 | `Badge` | Badge/indicateur numérique | `Badge({ children?, count?, variant?, dot?, max?, overlap?, className?, style? })` |
| 102 | `Chip` | Élement compact (tag) | `Chip({ label?, onDelete?, avatar?, variant?, clickable?, icon?, className?, style? })` |
| 103 | `Tooltip` | Info-bulle au survol | `Tooltip({ content?, children?, position?, delay?, arrow?, className?, style? })` |
| 104 | `Popover` | Popup contextuelle | `Popover({ content?, children?, position?, trigger?, open?, onClose?, className?, style? })` |

---

### 🎮 SURFACE & OVERLAY - `src/components/overlay/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 105 | `Card` | Carte conteneur | `Card({ children?, padding?, shadow?, radius?, border?, hoverable?, className?, style? })` |
| 106 | `Accordion` | Panneau extensible multiple | `Accordion({ items?, multiple?, defaultOpen?, onChange?, className?, style? })` |
| 107 | `AccordionItem` | Élément d'accordéon | `AccordionItem({ title?, children?, open?, onToggle?, icon?, className?, style? })` |
| 108 | `Tabs` | Onglets de navigation | `Tabs({ items?, activeTab?, onChange?, orientation?, variant?, className?, style? })` |
| 109 | `Tab` | Élément d'onglet | `Tab({ label?, disabled?, icon?, badge?, className?, style? })` |
| 110 | `Modal` | Fenêtre modale (dialog) | `Modal({ open?, onClose?, title?, children?, size?, closeOnBackdrop?, scrollable?, className?, style? })` |
| 111 | `Dialog` | Boîte de dialogue standard | `Dialog({ open?, onClose?, title?, description?, actions?, size?, className?, style? })` |
| 112 | `AlertDialog` | Dialogue de confirmation | `AlertDialog({ open?, onClose?, title?, description?, confirmText?, cancelText?, onConfirm?, className?, style? })` |
| 113 | `Drawer` | Panneau latéral coulissant | `Drawer({ open?, onClose?, anchor?, size?, variant?, className?, style?, children? })` |
| 114 | `BottomSheet` | Panneau depuis le bas | `BottomSheet({ open?, onClose?, height?, snapPoints?, draggable?, detent?, className?, style?, children? })` |
| 115 | `SideSheet` | Panneau latéral | `SideSheet({ open?, onClose?, side?, width?, overlay?, className?, style?, children? })` |
| 116 | `Popover` | Popover contextuel | `Popover({ open?, onClose?, anchorEl?, placement?, offset?, className?, style?, children? })` |
| 117 | `Menu` | Menu déroulant | `Menu({ open?, anchorEl?, onClose?, items?, placement?, className?, style? })` |
| 118 | `Dropdown` | Liste déroulante | `Dropdown({ trigger?, items?, placement?, onSelect?, className?, style? })` |
| 119 | `ContextMenu` | Menu contextuel (clic droit) | `ContextMenu({ items?, onClose?, position?, className?, style? })` |

---

### 🎯 INTERACTIVE - `src/components/interactive/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 120 | `Details` | Détails révélables | `Details({ summary?, children?, open?, onToggle?, icon?, className?, style? })` |
| 121 | `Summary` | Résumé visible | `Summary({ children?, icon?, className?, style? })` |
| 122 | `Toolbar` | Barre d'outils | `Toolbar({ children?, orientation?, dense?, variant?, className?, style? })` |
| 123 | `MenuBar` | Barre de menu | `MenuBar({ items?, orientation?, onSelect?, className?, style? })` |
| 124 | `CommandPalette` | Palette de commandes (Cmd+K) | `CommandPalette({ open?, onClose?, commands?, placeholder?, onSelect?, className?, style? })` |
| 125 | `Hotkey` | Raccourci clavier | `Hotkey({ keys?, callback?, description?, label?, className?, style? })` |
| 126 | `Resizable` | Panneau redimensionnable | `Resizable({ children?, direction?, minWidth?, maxWidth?, onResize?, className?, style? })` |
| 127 | `Draggable` | Élément déplaçable | `Draggable({ children?, axis?, disabled?, onDrag?, onStop?, className?, style? })` |
| 128 | `Droppable` | Zone déposable | `Droppable({ children?, disabled?, onDrop?, onDragOver?, className?, style? })` |

---

### 📐 LAYOUT UTILITIES - `src/components/layout-utilities/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 129 | `Container` | Conteneur principal | `Container({ maxWidth?, fluid?, centered?, gutters?, className?, style?, children? })` |
| 130 | `Row` | Ligne flexbox | `Row({ align?, justify?, wrap?, gap?, className?, style?, children? })` |
| 131 | `Column` | Colonne de grille | `Column({ span?, offset?, order?, pull?, push?, className?, style?, children? })` |
| 132 | `Spacer` | Espaceur flexible | `Spacer({ size?, axis?, className?, style? })` |
| 133 | `Divider` | Séparateur | `Divider({ orientation?, variant?, text?, thickness?, className?, style? })` |
| 134 | `AspectRatio` | Ratio d'aspect | `AspectRatio({ ratio?, children?, width?, height?, className?, style? })` |
| 135 | `Center` | Centrage de contenu | `Center({ children?, axis?, centerText?, className?, style? })` |
| 136 | `Stack` | Pile de composants espacés | `Stack({ spacing?, direction?, wrap?, divider?, className?, style?, children? })` |
| 137 | `Wrap` | Wrap flex | `Wrap({ spacing?, justify?, align?, children?, className?, style? })` |

---

### 🔧 UTILITIES - `src/components/utilities/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 138 | `Portal` | Render dans un autre DOM node | `Portal({ children?, container?, disabled?, className?, style? })` |
| 139 | `FocusTrap` | Piège à focus (accessibilité) | `FocusTrap({ children?, active?, initialFocus?, returnFocus?, className?, style? })` |
| 140 | `ScrollLock` | Verrouillage du scroll | `ScrollLock({ children?, enabled?, target?, className?, style? })` |
| 141 | `IntersectionObserver` | Observateur d'intersection | `IntersectionObserver({ children?, onIntersect?, threshold?, once?, className?, style? })` |
| 142 | `VirtualList` | Liste virtuelle (performance) | `VirtualList({ items?, height?, itemHeight?, overscan?, renderItem?, className?, style? })` |
| 143 | `InfiniteScroll` | Défilement infini | `InfiniteScroll({ hasMore?, loadMore?, threshold?, children?, className?, style? })` |
| 144 | `LazyLoad` | Chargement paresseux | `LazyLoad({ children?, offset?, placeholder?, once?, className?, style? })` |
| 145 | `ErrorBoundary` | Capture d'erreurs React | `ErrorBoundary({ children?, fallback?, onError?, className?, style? })` |
| 146 | `Suspense` | Suspense natif React | `Suspense({ fallback?, children?, className?, style? })` |

---

### 🌍 SEO & DOCUMENT - `src/components/seo/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 147 | `Title` | Change le titre document | `Title({ children?, suffix?, prefix?, template?, className?, style? })` |
| 148 | `MetaTags` | Balises meta SEO | `MetaTags({ title?, description?, keywords?, author?, robots?, canonical?, className?, style? })` |
| 149 | `OpenGraph` | Balises Open Graph | `OpenGraph({ title?, description?, image?, url?, type?, siteName?, className?, style? })` |
| 150 | `TwitterCard` | Twitter Card | `TwitterCard({ card?, site?, title?, description?, image?, className?, style? })` |
| 151 | `JsonLd` | Données structurées Schema.org | `JsonLd({ data?, type?, className?, style? })` |
| 152 | `Helmet` | Gestionnaire de balises `<head>` | `Helmet({ children?, className?, style? })` |

---

### 📊 DATA DISPLAY - `src/components/data/`

| # | Composant | Description | Signature |
|---|-----------|-------------|-----------|
| 153 | `Statistic` | Valeur statistique | `Statistic({ value?, label?, prefix?, suffix?, trend?, className?, style? })` |
| 154 | `Counter` | Compteur animé | `Counter({ value?, from?, duration?, format?, decimals?, className?, style? })` |
| 155 | `Timeline` | Ligne de temps | `Timeline({ items?, orientation?, alternate?, color?, className?, style? })` |
| 156 | `Carousel` | Carrousel | `Carousel({ items?, autoplay?, interval?, indicators?, navigation?, loop?, className?, style? })` |
| 157 | `Stepper` | Indicateur d'étapes | `Stepper({ steps?, active?, orientation?, alternativeLabel?, className?, style? })` |
| 158 | `Steps` | Étapes de processus | `Steps({ current?, items?, orientation?, statusIcons?, className?, style? })` |
| 159 | `Tree` | Vue arborescente | `Tree({ data?, renderNode?, expandAll?, onSelect?, onToggle?, className?, style? })` |
| 160 | `TreeView` | Vue d'arbre interactive | `TreeView({ nodes?, selected?, expanded?, onToggle?, onSelect?, className?, style? })` |
| 161 | `Collapse` | Animation de collapse | `Collapse({ in?, children?, timeout?, dimension?, appear?, className?, style? })` |

---

**Total : 161 composants** 🎉