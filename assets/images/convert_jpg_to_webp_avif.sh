#!/bin/bash

# Dossier courant
DIR="$(pwd)"

# Dossiers interdits (sécurité)
FORBIDDEN=("/" "/home" "/usr" "/bin" "/etc" "/var" "/opt")

# Vérification des dépendances
command -v convert >/dev/null 2>&1 || { 
    echo "ImageMagick n'est pas installé. Installe-le avec : sudo apt install imagemagick"
    exit 1
}

# Vérification dossier dangereux
for d in "${FORBIDDEN[@]}"; do
    if [[ "$DIR" == "$d" ]]; then
        echo "⚠️  Sécurité : conversion interdite dans le dossier $DIR"
        exit 1
    fi
done

echo "Dossier courant : $DIR"
echo ""

# Recherche récursive des fichiers JPG/JPEG
mapfile -t FILES < <(find "$DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \))

COUNT="${#FILES[@]}"

if [[ "$COUNT" -eq 0 ]]; then
    echo "Aucune image JPG/JPEG trouvée dans ce dossier (ni ses sous-dossiers)."
    exit 0
fi

echo "Nombre d'images détectées : $COUNT"
echo ""

# Demande : redimensionner les WebP/AVIF ?
echo "Voulez-vous redimensionner les versions WebP/AVIF à 1920px max (proportions conservées) ? (o/n)"
read -r RESIZE_CONFIRM

RESIZE=false
if [[ "$RESIZE_CONFIRM" == "o" ]]; then
    RESIZE=true
fi

echo ""
echo "Voulez-vous convertir ces fichiers en WebP et AVIF ? (o/n)"
read -r CONFIRM

if [[ "$CONFIRM" != "o" ]]; then
    echo "Conversion annulée."
    exit 0
fi

echo ""
echo "Début du traitement..."
echo "--------------------------"

# Conversion
for file in "${FILES[@]}"; do
    base="${file%.*}"

    echo "Traitement : $file"

    # Conversion en WebP
    convert "$file" -quality 85 "${base}.webp"

    # Conversion en AVIF
    convert "$file" -quality 50 "${base}.avif"

    # Redimensionnement uniquement des WebP/AVIF
    if [[ "$RESIZE" == true ]]; then
        echo " → Redimensionnement des versions WebP/AVIF"

        convert "${base}.webp" -resize 1920x1920\> "${base}.webp"
        convert "${base}.avif" -resize 1920x1920\> "${base}.avif"
    fi

    echo " → OK : ${base}.webp et ${base}.avif"
    echo ""
done

echo "Traitement terminé."

