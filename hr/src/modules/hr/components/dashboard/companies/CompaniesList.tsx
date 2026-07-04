import { CompanyListItem } from "../../../types";
import CompanyListCard from "./CompanyListCard";

type Props = {
  companies: CompanyListItem[];
};

export default function CompaniesList({ companies }: Props) {
  return companies.map((company) => (
    <CompanyListCard key={company.company_id} company={company} />
  ));
}
