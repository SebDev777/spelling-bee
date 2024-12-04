import * as logos from "../components/Logos"

export default function Credits() {
    return (
        <div className="container-fluid full-height d-flex justify-content-end align-items-end">
            <div className="row mb-0 align-items-end mt-1">
                <div className="col">
                    <div>
                        <h6>@copyright by <em>SebDev</em></h6>
                        <h7><em>Made with</em></h7>
                        <logos.BootstrapLogo style={{width: "15%", height: "15%"}} />
                        <logos.ReactLogo style={{width: "20%", height: "20%"}} />
                    </div>
                </div>
            </div>
        </div>
    )
}