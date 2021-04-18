export interface ContractDTO {
  id: number
  startDate: string
  endDate: string
  serviceIndustry: {
    id: number
    name: string
    register: string
  }
}
