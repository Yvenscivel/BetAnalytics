from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Troque pelos seus dados do Postgres: usuario, senha, host e nome_do_banco
SQLALCHEMY_DATABASE_URL = "postgresql://usuario:senha@localhost/betanalytics"

# A engine é o motor que se comunica com o driver do banco
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cada objeto SessionLocal será uma conversa individual com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base de onde todos os nossos modelos de tabelas vão herdar
Base = declarative_base()