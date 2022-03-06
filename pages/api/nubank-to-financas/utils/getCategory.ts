interface IObjects {
  date: string;
  category: string;
  title: string;
  amount: string;
}

export default function getCategory(obj: IObjects) {
  const categoriaRaw = obj.category;
  const title = obj.title;
  let subcategory = "";
  let category = "Outros";

  // SERVIÇOS

  if (categoriaRaw === "") {
    if (title === "Recarga de celular") {
      category = "Serviços";
      subcategory = "Telefone";
    }
  }

  const hbo = title.includes("hbomaxcom");
  const spotify = title.includes("Spotify");
  const googleDrive = title.includes("Google Storage");

  if (hbo || spotify || googleDrive) {
    category = "Serviços";
    subcategory = "Assinaturas";
  }

  //TRANSPORTE

  const latam = title.includes("Latam");
  const posto = title.includes("Posto");
  const uber = title.includes("*Uber *Trip");

  if (latam || posto || uber) {
    category = "Transporte";
  }

  if (latam) {
    subcategory = "Avião";
  }

  if (posto) {
    subcategory = "Gasolina";
  }

  if (uber) {
    subcategory = "Uber";
  }

  //PETS
  const petlove = title.includes("Petlove");
  if (petlove) {
    category = "Pets";
  }

  // COMIDA

  const ifood = title.includes("Ifood");
  const panificadora = title.includes("Panificadora");
  const beijoFrio = title.includes("Beijo Frio");

  if (ifood || panificadora || categoriaRaw === "restaurante" || beijoFrio) {
    category = "Alimentação";
  }

  if (panificadora) {
    subcategory = "Café da Manhã";
  }

  if (beijoFrio) {
    subcategory = "Lanche";
  }

  if (ifood) {
    subcategory = "Ifood";
  }

  //SAUDE

  const drogaria = title.includes("Drogaria");

  if (drogaria) {
    category = "Saúde";
    subcategory = "Remédios";
  }

  // LAZER

  const metropolis = title.includes("Metropolis");
  const nintendo = title.includes("Nintendo");

  if (metropolis || nintendo) {
    category = "Lazer";
  }

  if (metropolis) {
    subcategory = "Rolês";
  }

  if (nintendo) {
    subcategory = "Jogos";
  }

  //ROUPAS
  const shein = title.includes("Shein");

  if (shein) {
    category = "Vestuário";
  }

  // MAE
  const natuhEmporio = title.includes("Natuh");
  if (natuhEmporio) {
    category = "Mãe";
  }

  return { category, subcategory };
}
