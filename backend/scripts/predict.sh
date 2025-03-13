#!/bin/bash

# Nome do arquivo de perguntas
QUESTIONS_FILE="questions.txt"

# URL base do servidor
BASE_URL="http://localhost:8500/llm"

# Verifica se o arquivo existe
if [ ! -f "$QUESTIONS_FILE" ]; then
  echo "Arquivo $QUESTIONS_FILE não encontrado!"
  exit 1
fi

# Itera sobre cada linha do arquivo
while IFS= read -r question || [[ -n "$question" ]]; do
  # Remove espaços extras e aspas desnecessárias
  question=$(echo "$question" | xargs)

  # Cria o payload JSON
  payload=$(cat <<EOF
{
  "prompt": "$question"
}
EOF
)

  echo "============================================"
  echo "Enviando pergunta: $question"
  echo "============================================"

  # Lista de endpoints a serem chamados
  ENDPOINTS=(
    "groqv1"
    "groqv2"
    "groqv1-filter"
    "groqv2-filter"
    "gemmav1"
    "gemmav2"
    "gemmav1-filter"
    "gemmav2-filter"
  )

  for endpoint in "${ENDPOINTS[@]}"; do
    echo "Chamando $BASE_URL/$endpoint..."
    curl -X POST "$BASE_URL/$endpoint" \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d "$payload"
    
    echo -e "\n-----------------------------------\n"
  done
done < "$QUESTIONS_FILE"
