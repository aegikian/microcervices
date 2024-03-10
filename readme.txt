Микросервисы.

Создаем:

1 Корневой package.json : {
  "name": "microfront",
  "version": "1.0.0",
  "description": "",
  "workspaces": [
    "packages/*", —воркспейс с шареным кодом
    "services/*" —	воркспейс с приложениями
  ],
  "scripts": {
    "start" : "npm run start -w ‘название пакета в формате имени (host || e.t.c)’ & npm run start -w (тоже) & npm run start -w(тоже)
  }
}

2 папки:
Структура
￼


 Папка packages :

 Папка build-config {
  	package.json: {
    "name": "@packages/build-config", имя директории воркспейса
    "version": "1.0.0",
    "description": "",
    "main": "./src/index.ts", — точка входа,
	devDependencies: {
	все девдепенденси проекта, общие для всех приложений
	}
	},
Src — папка с кодом настройки билдов,
tsconfig.json: {
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "ESNext",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "composite": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}

  }

 Папка shared - для хелперов, кита и тд package.json {
    "name": "@packages/shared",
    "version": "1.0.0",
    "main": "./src/index.ts"
},
tsconfig.json: {
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "ESNext",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "composite": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
},
Папка src для шареного кода



ПАПКА SERVICES:

Разные приложения примерный package.json в приложении:

{
  "name": "admin", — имя для использования
  "version": "1.0.0",
  "main": "./src/index.ts",
  "scripts": {
    "start": "webpack serve --env mode=development --open",
    "build:prod": "webpack --env mode=production",
    "build": "webpack --env mode=development"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21"
  }
}

Общий tsconfig.base.json в services :

{
  "compilerOptions": {
    "noImplicitAny": true,
    "module": "ESNext",
    "target": "es5",
    "jsx": "react-jsx",
    "allowJs": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}



Плагины в вебпак не хост проекта 

  new webpack.container.ModuleFederationPlugin({
    name: "admin",
    filename: "remoteEntry.js", — название файла
    exposes: {
      "./Router": "./src/router.tsx", — экспортируемый файл
    },
    shared: {
      ...packageJson.dependencies, — все dependencies из package.json
      react: {
        eager: true, ****сноска снизу
        requiredVersion: packageJson.dependencies["react"], — захват версий из пэкейдж
      },
      "react-router-dom": {
        eager: true,
        requiredVersion: packageJson.dependencies["react-router-dom"],
      },
      "react-dom": {
        eager: true,
        requiredVersion: packageJson.dependencies["react-dom"],
      },
    },
  }),

Плагины host 


const plugins = (env: EnvVar) => {
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";

  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      publicPath: '/'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new DefinePlugin({}),
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`, —импорт
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`, — импорт
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, ****сноска снизу
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    }),
  ];
};

****Когда eager установлен в true, это означает, что зависимости будут загружены сразу, когда приложение будет запущено. Это может быть полезно в ситуациях, когда вы уверены, что определённые зависимости будут необходимы с самого начала работы вашего приложения.

Проект с настройками https://github.com/aegikian/microcervices



