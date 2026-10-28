import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />

      <section className={`container ${styles.page}`}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">

            {/* Profile Header */}
            <div className="text-center mb-5">
              <div className={styles.avatar}>
                <i className="bi bi-person-fill"></i>
              </div>

              <h1 className="fs-3 fw-bold mb-1">Radha</h1>

              <p className="text-secondary mb-0">
                radha@example.com
              </p>
            </div>

            {/* Account */}
            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">
                Account
              </h2>

              <div className={`rounded-3 p-3 ${styles.card}`}>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>
                    <div className="fw-semibold">Membership</div>
                    <small className="text-secondary">
                      Premium Plan
                    </small>
                  </div>

                  <span className="badge bg-danger">
                    PREMIUM
                  </span>
                </div>

                <hr className="border-secondary" />

                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>
                    <div className="fw-semibold">Email</div>
                    <small className="text-secondary">
                      radha@example.com
                    </small>
                  </div>

                  <button className="btn btn-outline-light btn-sm">
                    Change
                  </button>
                </div>

                <hr className="border-secondary" />

                <div className="d-flex justify-content-between align-items-center py-2">
                  <div>
                    <div className="fw-semibold">Password</div>
                    <small className="text-secondary">
                      ********
                    </small>
                  </div>

                  <button className="btn btn-outline-light btn-sm">
                    Change
                  </button>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">
                Preferences
              </h2>

              <div className={`rounded-3 ${styles.card}`}>
                <button className={styles.setting}>
                  <div>
                    <i className="bi bi-translate me-3"></i>
                    Language
                  </div>

                  <div className="text-secondary">
                    English
                    <i className="bi bi-chevron-right ms-3"></i>
                  </div>
                </button>

                <button className={styles.setting}>
                  <div>
                    <i className="bi bi-play-circle me-3"></i>
                    Playback Settings
                  </div>

                  <i className="bi bi-chevron-right text-secondary"></i>
                </button>

                <button className={styles.setting}>
                  <div>
                    <i className="bi bi-bell me-3"></i>
                    Notifications
                  </div>

                  <i className="bi bi-chevron-right text-secondary"></i>
                </button>
              </div>
            </section>

            {/* Help */}
            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">
                Support
              </h2>

              <div className={`rounded-3 ${styles.card}`}>
                <button className={styles.setting}>
                  <div>
                    <i className="bi bi-question-circle me-3"></i>
                    Help Center
                  </div>

                  <i className="bi bi-chevron-right text-secondary"></i>
                </button>

                <button className={styles.setting}>
                  <div>
                    <i className="bi bi-shield-check me-3"></i>
                    Privacy
                  </div>

                  <i className="bi bi-chevron-right text-secondary"></i>
                </button>
              </div>
            </section>

            {/* Sign Out */}
            <div className="text-center mt-5">
              <button className="btn btn-outline-danger px-4">
                <i className="bi bi-box-arrow-right me-2"></i>
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;