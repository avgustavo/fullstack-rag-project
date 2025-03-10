#!/bin/bash

# Nome do arquivo CSV gerado
CSV_FILE="pdf_info.csv"

# Verifica se o arquivo existe
if [ ! -f "$CSV_FILE" ]; then
  echo "Arquivo $CSV_FILE não encontrado!"
  exit 1
fi

# Pula a primeira linha (header) e processa cada linha do CSV
tail -n +2 "$CSV_FILE" | while IFS=, read -r pdf_url course_code course_name semester; do
  # Remove aspas de volta, se existirem
  pdf_url=$(echo "$pdf_url" | tr -d '"')
  course_code=$(echo "$course_code" | tr -d '"')
  course_name=$(echo "$course_name" | tr -d '"')
  semester=$(echo "$semester" | tr -d '"')

  # Cria o payload JSON
  payload=$(cat <<EOF
{
  "universityCode": "$course_code",
  "semester": "$semester",
  "courseName": "$course_name",
  "fileUrl": "$pdf_url"
}
EOF
)

  echo "Enviando payload para $pdf_url:"
  echo "$payload"
  echo "Resposta:"
  
  # Executa a requisição curl
  curl -X POST 'http://localhost:8500/syllabus/ingest' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "$payload"
  
  echo -e "\n-----------------------------------\n"
done
