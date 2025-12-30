
from sqlalchemy.orm import Session
import models.bet as models
import schemas.bet as schemas

def create_bet(db: Session, bet: schemas.BetCreate):

    lucro = 0.0
    
    status = bet.status_bet.lower() # Padroniza para "green" ou "red"
    if status == "green":
        lucro = (bet.valor_apostado * bet.odd) - bet.valor_apostado
    elif status == "red":
        lucro = -bet.valor_apostado

# 2. Transforme o Schema em Model
    db_bet = models.Bets(
        descricao_bet=bet.descricao_bet,
        valor_apostado=bet.valor_apostado,
        odd=bet.odd,
        status_bet=bet.status_bet,
        lucro_prejuizo=lucro # Aqui entra o valor que você calculou
    )
    
    # 3. Comandos do SQLAlchemy para salvar
    db.add(db_bet)
    db.commit()
    db.refresh(db_bet)
    
    return db_bet

def get_bets(db: Session):
    return db.query(models.Bets).all()

