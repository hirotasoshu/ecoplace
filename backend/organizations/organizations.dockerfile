FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./ /app

#install poetry
RUN pip install poetry

# disable virtualenv for peotry
RUN poetry config virtualenvs.create false

# install dependencies
RUN poetry install --no-dev
