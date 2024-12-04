import * as logos from "../components/Logos";

const year = new Date().getFullYear();

const yellow = "rgb(238, 212, 159)";
const orange = "rgb(251, 189, 97)";

export default function TopPage() {
  return (
    <div class="container">
      <div class="container my-5 mb-0">
        <div className="row">
          <div className="col-lg-2">
            <logos.BeeLogo style={{ width: "150px", height: "150px" }} />
            <h4 style={{ color: yellow }}>
              <em>Spelling Bee Contest</em>
            </h4>
          </div>
          <div className="col-lg-8 text-center">
            <h1 class="text-center">
              Spelling Bee Contest {year ? year : null}
            </h1>
            <p class="lead">
              Welcome to the{" "}
              <em style={{ color: orange }}>Spelling Bee Contest!</em>
              <logos.BeeLogo style={{ width: "50px", height: "50px" }} /> - a
              wonderful and fun event made with love!
            </p>
            <h3>Hosted by: Mg. Adela Gaona Moscoso</h3>
            <h5>
              <em>By Graduate John Sebastian M.</em>
            </h5>
          </div>
          <div className="col-lg-1">
            <logos.SchoolLogo style={{ width: "200px", height: "200px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
