const initialize = () => {
    window.innerSolarSystem = [
        {
            name: '日',
            // 太阳质量为单位质量
            m: 1,
            x: -1.50324727873647e-6,
            y: -3.93762725944737e-6,
            z: -4.86567877183925e-8,
            vx: 3.1669325898331e-5,
            vy: -6.85489559263319e-6,
            vz: -7.90076642683254e-7,
            pBuffer: [],
            r: 12,
            color: '255, 255, 102,',
        },
        {
            name: '水',
            m: 1.65956463e-7,
            x: -0.346390408691506,
            y: -0.272465544507684,
            z: 0.00951633403684172,
            vx: 4.25144321778261,
            vy: -7.61778341043381,
            vz: -1.01249478093275,
            pBuffer: [],
            r: 2,
            color: '160, 160, 160,',
        },
        {
            name: '金',
            m: 2.44699613e-6,
            x: -0.168003526072526,
            y: 0.698844725464528,
            z: 0.0192761582256879,
            vx: -7.2077847105093,
            vy: -1.76778886124455,
            vz: 0.391700036358566,
            pBuffer: [],
            r: 4,
            color: '255, 153, 51,',
        },
        {
            name: '地',
            m: 3.0024584e-6,
            x: 0.648778995445634,
            y: 0.747796691108466,
            z: -3.22953591923124e-5,
            vx: -4.85085525059392,
            vy: 4.09601538682312,
            vz: -0.000258553333317722,
            pBuffer: [],
            r: 4,
            color: '102, 102, 255,',
        },
        {
            name: '火',
            m: 3.213e-7,
            x: -0.574871406752105,
            y: -1.395455041953879,
            z: -0.01515164037265145,
            vx: 4.9225288800471425,
            vy: -1.5065904473191791,
            vz: -0.1524041758922603,
            pBuffer: [],
            r: 3,
            color: '255, 51, 51,',
        },
    ]
    const g = 39.5
    const dt = 0.008 //0.008 years is equal to 2.92 days
    const softeningConstant = 0.15
    
    window.system = System()
    system.g = g
    system.dt = dt
    system.softeningConstant = softeningConstant
    system.stars = deepClone(innerSolarSystem)
    
    window.trailLength = 35
    window.scale = 100
    window.radius = 1
}