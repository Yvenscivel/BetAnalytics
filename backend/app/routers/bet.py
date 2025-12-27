from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal # Você vai precisar de uma função get_db aqui
import crud.bet as crud
import schemas.bet as schemas

router = APIRouter(
    prefix="/bets",
    tags=["bets"]
)

# Como você faria a rota GET para listar as apostas?
# Dica: use o crud.get_bets(db)