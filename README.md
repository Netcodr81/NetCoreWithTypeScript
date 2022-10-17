# Integrating ASP.Net Core MVC With TypeScript and Webpack

This repo is designed to show you how to integrate your ASP.NET Core MVC application with TypeScript and Webpack. While this is an MVC application, the same principles apply to other .NET Core applications. I will not be covering how to create an ASP.NET Core MVC application, instead focusing on how to set up webpack and TypeScript in your application. If you would like to know more about creating a MVC application see Microsoft's official documentation [https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc).

## Getting Started

1. The first thing you need to do is ensure you have node.js installed on your machine. You can find the instructions on how to install Node on their official website [https://nodejs.org](https://nodejs.org)

2. After installing node on your machine add the following files to the root of you project.

**package.json**

```typescript
{
  "version": "1.0.0",
  "name": "net-core-with-typescript",
  "private": true,
    "scripts": {
      "build:development": "webpack --mode=development --config webpack.dev.config.js",
      "build:production": "webpack --mode=production --config webpack.prod.config.js",
      "watch": "webpack --mode=development --config webpack.dev.config.js --watch"
    },
  "dependencies": {
   
  },
  "devDependencies": {    
    "ts-loader": "9.4.1",
    "typescript": "4.7.4",
    "webpack": "5.74.0",
    "webpack-cli": "^4.10.0"
  }
}

```

This file contains the javascript dependencies you need. After creating this file open a terminal window in the root directory and run `npm install`. This will install all the packages listed in the devDependencies section. The scripts in the script section are the webpack cli commands used to bundle your TypeScript code with Webpack.

**tsconfig.json**

```typescript
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "moduleResolution": "node"

  },
  "compileOnSave": true
  
}

```

This is your basic TypeScript configuration file and is all your really need to get started. If you want to learn more about adding more configurations, see the official site [https://www.typescriptlang.org/](https://www.typescriptlang.org/).

**webpack.dev.config.js**

```typescript
const path = require("path");

module.exports = {

    entry: "./scripts/index.ts",
    cache: false,
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        library: {
            name: "MYAPP",
            type: "var",
        },
        filename: "app-client.js",
        path: path.resolve(__dirname, "./wwwroot/js"),
    }   

}

```

This configuration file will be used during development. The output section tells Webpack where to output the bundled file. You can put it anywhere you want. I chose to put it in the wwwroot folder. The library section gives your bundle a global name you can reference, in this case MYAPP. MYAPP acts as a global variable preventing function collisions from occurring. 

**webpack.prod.config.js**

```typescript
const path = require("path");

module.exports = {

    entry: "./scripts/index.ts",
    cache: false,
    model: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        library: {
            name: "MYAPP",
            type: "var",
        },
        filename: "app-client.js",
        path: path.resolve(__dirname, "./wwwroot/js"),
    }

}

```

This configuration file will be used during a production build. Right now, it is the same as the dev configuration with the exception of the mode. Splitting the configuration files into two separate files allows for easier configuration for development and production scripts. The cache option for both configuration files is set to false. I found if you leave it at it's default of true, changes you make during development won't be reflected without first manually clearing the cache.

Webpack is a great package that can do a lot. You can learn more about Webpack as well as additional configuration options at their official site [https://webpack.js.org/](https://webpack.js.org/).


3. Add a `scripts` folder to the root of your project and add two TypeScript files, `index.ts` and `hello.ts`.

In the `hello.ts` file add the following code. This creates a simple function that pops up an alert box with "Hello World!".

```typescript
export namespace funcs {
    export function hello(): void {
        const message = "Hello World!";
        alert(message);
    }
}
```

The `index.ts` file will act as the entry point for Webpack. This file will not contain any functions or classes. It is used to define which parts of our code (functions, interfaces, classes, etc) will be exposed to the outside world. It is possible to have multiple entry points, however I chose to use just one file for this simple demonstration. You can learn more about adding multiple entry points on Webpacks official site. In `index.ts` add the following

```typescript
export * from "./hello";
```

4. Next you will need to add the `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation` package from the Nuget store. This package ensures any changes made to the JavaScript bundle created by Webpack is instantly reflected without the need to stop and restart your application. After installing the package, open the program.cs file and add the following

```csharp

builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

```

5. You will need to make a change to your .csproj file. Right-click your project and select `Edit Project File` from the menu. Add the following to the file directly under the first `<PropertyGroup>`.

```csharp

<!--
      1. Install npm packages
      "Inputs" and "Outputs" are used for incremental builds. If all output items are up-to-date, MSBuild skips the target.
      The first time the task is executed. Then, it only runs when you change the package.json file.
      Documentation: https://learn.microsoft.com/en-us/visualstudio/msbuild/incremental-builds?WT.mc_id=DT-MVP-5003978
   -->
 <Target Name="CheckForNpm" BeforeTargets="RunNpmInstall">
  <Exec Command="npm --version" ContinueOnError="true">
   <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
  </Exec>
  <Error Condition="'$(ErrorCode)' != '0'" Text="NPM is required to build this project." />
 </Target>

 <Target Name="RunNpmInstall" BeforeTargets="NpmRunBuild" Inputs="package.json" Outputs="$(NpmLastInstall)">
  <Exec Command="npm install" />
  <Touch Files="$(NpmLastInstall)" AlwaysCreate="true" />
 </Target>

 <!--
      2. Run npm run build before building the .NET project.
      MSBuild runs NpmInstall before this task because of the DependsOnTargets attribute.  
	  The following items are used to run the npm scripts found in your package.json file.
	  
	  -->
 
<Target Name="NpmRunBeforeBuildDebug" DependsOnTargets="CheckForNpm" Condition="'$(Configuration)' == 'Debug'" BeforeTargets="Build">
  <Exec Command="npm run build:development" />  
 </Target>

 <Target Name="NpmRunBeforeRebuildDebug" DependsOnTargets="CheckForNpm" Condition="'$(Configuration)' == 'Debug'" BeforeTargets="Rebuild">
  <Exec Command="npm run build:development" />
 </Target>

 <Target Name="NpmRunBeforeBuildProduction" DependsOnTargets="CheckForNpm" Condition="'$(Configuration)' == 'Release'" BeforeTargets="Build">
  <Exec Command="npm run build:production" />
 </Target>

 <Target Name="NpmRunBeforeRebuildProduction" DependsOnTargets="CheckForNpm" Condition="'$(Configuration)' == 'Release'" BeforeTargets="Rebuild">
  <Exec Command="npm run build:production" />
 </Target>
 
 <ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation" Version="6.0.10" />
 </ItemGroup>

```

6. Build your project. After building your project, you should see a JavaScript file in the wwwroot/js folder named app-client.js. If you see this file, it means you have successfully added Webpack and TypeScript to your application. Open up the `_layout.cshtml` file and add the following script just above the `RenderSection` tag

```razor
 <script  src="~/js/app-client.js" type="text/javascript"></script>
```

7. Finally, open the `Index.cshtml` file and modify it so that it looks like this

```razor

@{
    ViewData["Title"] = "Home Page";
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
</div>

<button id="btn" class="btn btn-success">Click Me to say hello world!</button>

<script>
  

    document.addEventListener('DOMContentLoaded', () =>{
    var button = document.getElementById("btn");
    
    button.addEventListener("click", function(){
        MYAPP.funcs.hello();
    })
    });


</script>
```

This creates a button and attaches the `hello()` function to it's onclick event.

## Adding Hot Module Reloading

During development you don't want to have to restart your application every time you make a change. Webpack offers and option to watch your files and when it detects a change, it will rebundle and deploy the new bundle. 

There are several ways to achieve this. The first way is simple and doesn't require you to add additional extensions to Visual Studio. 

### Non Extension Method

After opening your solution, bring up a terminal, navigate to the root directory of your project and run `npm run watch`. This runs the watch script in your package.json file. Webpack will run and then remain in watch mode. 

### Extension Method

This method has the benefit of not requiring you to run `npm run watch` every time you open your project. Instead `npm run watch` will automatically run when the project is opened. In order  to set this up, open up your extension manager and search for NPM Task Runner by Mads Kristensen. You can also download it and install it from the [Market Place](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64).

After installing the extension, open your package.json file and add the following line after your devDependencies

```typescript
"-vs-binding":{"ProjectOpened":["watch"]}
```

