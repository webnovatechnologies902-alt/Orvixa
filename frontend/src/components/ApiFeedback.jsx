const ApiFeedback = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="text-secondary py-4" role="status">
        <span className="spinner-border spinner-border-sm me-2" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return null;
};

export default ApiFeedback;
