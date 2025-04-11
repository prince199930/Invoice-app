const DetailCard = ({ label, value }) => (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-medium text-gray-900">{value || "N/A"}</p>
    </div>
  );

  export default DetailCard;
  