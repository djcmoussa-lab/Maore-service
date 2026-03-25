# Maore Service — Annuaire de services à Mayotte

Site vitrine et annuaire de prestataires avec système d'abonnement (Basique 5€, Standard 9,99€, Premium 15€/mois).

## Fonctionnalités

- Annuaire de services avec recherche et filtres par catégorie
- Carte interactive de Mayotte (Leaflet) avec 18 villages
- Système d'abonnement 3 niveaux (Basique / Standard / Premium)
- Formulaire de paiement intégré
- Fiches prestataires avec badges et mise en avant
- Design responsive

## Déployer sur Vercel (en 3 étapes)

### 1. Créer un compte GitHub + pousser le code

```bash
# Installer les dépendances
npm install

# Tester en local
npm run dev

# Initialiser Git et pousser sur GitHub
git init
git add .
git commit -m "Maore Service v1"
# Créer un repo sur github.com puis :
git remote add origin https://github.com/TON-USERNAME/maore-service.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub
2. Clique "New Project"
3. Importe ton repo `maore-service`
4. Vercel détecte automatiquement Vite — clique "Deploy"
5. Ton site est en ligne en ~30 secondes !

### 3. Ajouter un nom de domaine (optionnel)

1. Achète un domaine (ex: maoreservice.fr sur OVH ~10€/an)
2. Dans Vercel > Settings > Domains > ajoute ton domaine
3. Configure les DNS comme indiqué par Vercel

## Intégrer les vrais paiements (Stripe)

Le formulaire de paiement actuel est une maquette visuelle. Pour recevoir de vrais paiements :

1. Crée un compte sur [stripe.com](https://stripe.com)
2. Installe le SDK : `npm install @stripe/stripe-js`
3. Remplace le formulaire de paiement par Stripe Checkout
4. Configure un webhook pour activer les fiches après paiement

## Technologies

- React 18 + Vite
- Leaflet (carte OpenStreetMap)
- localStorage (données côté client)

## Licence

© 2026 Maore Service — Moussa — Passamainty, Mayotte
