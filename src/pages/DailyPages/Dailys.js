import { useFetch } from "../../hooks/useFetch";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";

function Dailys() {
  const { data, loading, error } = useFetch(getDailys);
console.log("dailys data", data)
  return (<div className="Dailys">
    <Suspense noData={!data && !loading} error={error} loading={loading}>
{data?.map((daily) => (
    <p key={daily._id}> {daily.message}</p>
) )}
    </Suspense>
  </div>);
}

export default Dailys;
