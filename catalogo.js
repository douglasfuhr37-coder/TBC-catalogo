const PRODUCTS = [
  {
    "id": "home",
    "name": "Home Spray",
    "size": "250 ml",
    "price": 44.9,
    "image": "home",
    "frags": [
      "Alecrim",
      "Bamboo",
      "Especiarias do Brasil",
      "Flor de Algodão",
      "Flor de Cerejeira",
      "Flor de Figo",
      "Flor de Laranjeira",
      "Lavanda Francesa",
      "Ameixa Negra",
      "Cereja com Avelã",
      "Chá Branco",
      "Romã com Baunilha",
      "Vanilla Black",
      "Limão Siciliano",
      "Maçã e Canela",
      "Pimenta Rosa",
      "Vanilla Daslu"
    ],
    "desc": "Perfume o ambiente com praticidade e deixe a casa com sensação de cuidado.",
    "localPrice": 39.9,
    "stock": 6
  },
  {
    "id": "lencois",
    "name": "Água para Lençóis",
    "size": "250 ml",
    "price": 39.9,
    "image": "lencois",
    "frags": [
      "Alecrim",
      "Bamboo",
      "Especiarias do Brasil",
      "Flor de Algodão",
      "Flor de Cerejeira",
      "Flor de Figo",
      "Flor de Laranjeira",
      "Lavanda Francesa",
      "Ameixa Negra",
      "Cereja com Avelã",
      "Chá Branco",
      "Romã com Baunilha",
      "Vanilla Black",
      "Limão Siciliano",
      "Maçã e Canela",
      "Pimenta Rosa",
      "Vanilla Daslu"
    ],
    "desc": "Fragrância suave para tecidos, roupas de cama e aquele toque de casa aconchegante.",
    "localPrice": 36.9,
    "stock": 6
  },
  {
    "id": "difusor",
    "name": "Difusor de Varetas",
    "size": "250 ml",
    "price": 56.9,
    "image": "difusor",
    "frags": [
      "Alecrim",
      "Bamboo",
      "Especiarias do Brasil",
      "Flor de Algodão",
      "Flor de Cerejeira",
      "Flor de Figo",
      "Flor de Laranjeira",
      "Lavanda Francesa",
      "Ameixa Negra",
      "Cereja com Avelã",
      "Chá Branco",
      "Romã com Baunilha",
      "Vanilla Black",
      "Limão Siciliano",
      "Maçã e Canela",
      "Pimenta Rosa",
      "Vanilla Daslu"
    ],
    "desc": "Perfuma continuamente o ambiente e também compõe a decoração.",
    "localPrice": 49.9,
    "stock": 6
  },
  {
    "id": "body60",
    "name": "Body Splash",
    "size": "60 ml",
    "price": 24.9,
    "image": "body",
    "frags": [
      "Manga Verde",
      "Melancia",
      "Pimenta Rosa"
    ],
    "desc": "Leve, perfumado e perfeito para usar ao longo do dia.",
    "localPrice": 21.9,
    "stock": 6
  },
  {
    "id": "body100",
    "name": "Body Splash",
    "size": "100 ml",
    "price": 29.9,
    "image": "body",
    "frags": [
      "Manga Verde",
      "Melancia",
      "Pimenta Rosa"
    ],
    "desc": "Mais produto para manter sua fragrância favorita sempre por perto.",
    "localPrice": 26.9,
    "stock": 6
  },
  {
    "id": "body250",
    "name": "Body Splash",
    "size": "250 ml",
    "price": 45.9,
    "image": "body",
    "frags": [
      "Manga Verde",
      "Melancia",
      "Pimenta Rosa"
    ],
    "desc": "Tamanho maior para quem já escolheu sua fragrância favorita.",
    "localPrice": 42.9,
    "stock": 6
  },
  {
    "id": "kit",
    "name": "Kit TBC",
    "size": "3 produtos",
    "price": 124.9,
    "image": "kit",
    "frags": [
      "Alecrim",
      "Bamboo",
      "Especiarias do Brasil",
      "Flor de Algodão",
      "Flor de Cerejeira",
      "Flor de Figo",
      "Flor de Laranjeira",
      "Lavanda Francesa",
      "Ameixa Negra",
      "Cereja com Avelã",
      "Chá Branco",
      "Romã com Baunilha",
      "Vanilla Black",
      "Limão Siciliano",
      "Maçã e Canela",
      "Pimenta Rosa",
      "Vanilla Daslu"
    ],
    "desc": "Home Spray + Água para Lençóis + Difusor de Varetas. O trio completo com valor especial.",
    "localPrice": 114.9,
    "stock": 6
  },
  {
    "id": "essencia",
    "name": "Essência Concentrada",
    "size": "10 ml",
    "price": 19.9,
    "image": "essencia",
    "frags": [
      "Bamboo",
      "Pitanga Preta",
      "Cereja e Avelã",
      "Cravo e Canela",
      "Flor de Cerejeira",
      "Pitanga",
      "Cheirinho Bebê",
      "Lavanda",
      "Pimenta Rosa",
      "Flor de Laranjeira",
      "Flor de Figo",
      "Alecrim"
    ],
    "desc": "Essência concentrada em frasco de 10 ml, disponível em várias fragrâncias.",
    "localPrice": 19.9,
    "stock": 6
  },
  {
    "id": "geleia",
    "name": "Geleia de Banho",
    "size": "200 ml",
    "price": 32.9,
    "localPrice": 29.9,
    "image": "geleia",
    "stock": 6,
    "frags": [
      "Maçã Verde",
      "Pêssego",
      "Melancia",
      "Maracujá"
    ],
    "desc": "Seu momento de banho com a fragrância que você escolher."
  },
  {
    "id": "sache",
    "name": "Sachê Perfumado",
    "size": "20 g",
    "price": 12.9,
    "localPrice": 9.9,
    "image": "sache",
    "stock": 6,
    "frags": [
      "Comfort",
      "Lavanda Francesa",
      "Morango",
      "Cheirinho de Bebê",
      "New Car",
      "Maçã Verde"
    ],
    "desc": "Perfuma gavetas, bolsas e pequenos espaços. Não retira umidade."
  }
];
const FREIGHT = {"Balneário Camboriú": 0, "Camboriú": 0, "Itajaí": 10, "Itapema": 15, "Brusque": 20, "Porto Belo": 20};
// Configure o endereço confirmado da marca para ativar os acessos ao Instagram.
const CONTACTS = { instagram: 'https://www.instagram.com/tbc.casaebemestar/' };
