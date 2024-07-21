

export interface ICity {
  idProvince: string
  name: string
}

export interface IDistrict extends ICity {
  idDistrict: string | null
}

export interface ICommune extends IDistrict {
  idCommune: string | null
}