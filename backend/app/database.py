import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Carrega as variáveis do arquivo .env
load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# A engine é o motor que se comunica com o driver do banco
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cada objeto SessionLocal será uma conversa individual com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base de onde todos os nossos modelos de tabelas vão herdar
Base = declarative_base()