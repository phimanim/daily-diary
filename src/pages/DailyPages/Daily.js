import { useParams, useHistory, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Suspense from "../../components/Suspense";
import { getDailyById, deleteDaily } from "../../api";

export default function Daily() {
  const { dailyId } = useParams();
  const { data, loading, error } = useFetch(
    () => getDailyById(dailyId),
    [dailyId]
  );

  const history = useHistory();
  
  const handleDelete = () => {
    deleteDaily(dailyId);
    history.push("/dailys");
  };

  return (
    <div>
      <Suspense error={error} loading={loading} noData={!data && !loading}>
        {data?.message}
        <Link to={`/dailys/${data?._id}/update`}>Update daily</Link>
        <button onClick={handleDelete}>Delete daily</button>
      </Suspense>
    </div>
  );
}
