from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models.bet as models
from database import engine
from routers import bet  # Importando o arquivo de rotas que você vai criar

# 1. Cria as tabelas no banco de dados automaticamente
# Isso lê tudo o que está herdando de 'Base' no models
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="BetAnalytics API")

# 2. Configuração de CORS (Fundamental para o React)
# Sem isso, o navegador bloqueia o seu Front-end de acessar o Back-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # No início, liberamos tudo. No futuro, você coloca a URL do seu Front.
    allow_credentials=True,
    allow_methods=["*"], # Permite GET, POST, DELETE, etc.
    allow_headers=["*"],
)

# 3. Incluindo as rotas modularizadas
app.include_router(bet.router)

@app.get("/")
def root():
    return {"status": "BetAnalytics API está online e operante!"}