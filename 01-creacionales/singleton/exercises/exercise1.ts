class AppConfig {
    private static instance: AppConfig;
    public appName: string = '';
    public version: string = '';

    private constructor(appName: string, version: string) {
        this.appName = appName;
        this.version = version;
    }

    public static getInstance(appName = '', version = ''): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = Object.freeze(new AppConfig(appName, version));
        }

        return AppConfig.instance;
    }
}

const main = () => {
    const config1 = AppConfig.getInstance('Fitness App', '1.0.0');

    const config2 = AppConfig.getInstance();
    console.log(config2.appName);
    console.log(config1 === config2);
}

main();