# JovemMoney

Este projeto é composto por duas partes:
- **Backend**: `jovemMoney` (Spring Boot)
- **Frontend**: `jovemMoney-client` (Angular)

---

## Como rodar

### 🔧 Backend (Spring Boot)

```bash
git clone https://github.com/seu-usuario/jovemMoney.git
cd jovemMoney
./mvnw spring-boot:run
```

> Requisitos: Java 17+ e Maven.  
> Configure o banco de dados no `src/main/resources/application.properties`, se necessário.

---

### 🌐 Frontend (Angular)

```bash
git clone https://github.com/seu-usuario/jovemMoney-client.git
cd jovemMoney-client
npm install
ng serve
```

> Acesse em: [http://localhost:4200](http://localhost:4200)

---

## Observações

- O frontend espera que o backend esteja rodando em `http://localhost:8080`.
- Ajuste o CORS no backend se necessário (`@CrossOrigin` ou configurações globais).
