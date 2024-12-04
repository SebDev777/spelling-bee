function LogoBase(src, style) {
    return (
        <img src={src} style={style} alt=""></img>
    )
}

export function BeeLogo({style}) {
    return LogoBase(require("../assets/bee.png"), style)
}

export function SchoolLogo({style}) {
    return LogoBase(require("../assets/logo-escudo.png"), style)
}

export function BootstrapLogo({style}) {
    return LogoBase(require("../assets/BootstrapLogo.png"), style)
}

export function ReactLogo({style}) {
    return LogoBase(require("../assets/ReactLogo.png"), style)
}