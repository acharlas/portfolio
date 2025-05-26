[![Next][Next.js]][Next-url] [![Tailwind][Tailwind]][Tailwind-url] [![Jest][Jest.js]][Jest-url] ![build]


# Portfolio

* This repository contains the source code for my portfolio website—built with Next.js, TypeScript, and Tailwind CSS. It’s designed as a straightforward, modern, and responsive showcase of my work and projects, leveraging server-side rendering for enhanced performance and strict type safety for improved code quality. 
* Additionally, the site is carefully deployed using a robust CI/CD pipeline with GitHub Actions that runs tests to ensure reliability throughout the deployment process.


## Features

- **Modern UI:** Built with Next.js and styled with Tailwind CSS.
- **Responsive Design:** Optimized for all devices—desktop, tablet, and mobile.
- **Customizable Content:** Easily update and modify the portfolio by editing files in the `app` and `components` directories.
- **Type Safety:** Written in TypeScript for a more robust development experience.

## Technologies

- [Next.js](https://nextjs.org/) – Framework for building React applications with server-side rendering.
- [TypeScript](https://www.typescriptlang.org/) – A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.

## CI/CD Deployment

The portfolio is deployed using a GitHub Actions workflow named **"CI/CD for Portfolio"**. This automated pipeline is configured to trigger on:
- Pushes to the `main` and `dev` branches,
- Pull requests targeting `main`,
- Manual triggers (workflow_dispatch), and
- A weekly schedule (every Sunday at midnight).

The workflow performs the following steps:
- **Build & Test:** It checks out the code, detects the package manager, sets up Node.js, caches dependencies, runs lint checks and dependency audits, and executes tests with coverage.
- **Build Process:** It builds the project using Next.js.
- **Code Analysis:** It runs CodeQL analysis to ensure code quality.
- **Deployment:** After a successful build and analysis, the site is deployed to GitHub Pages.

This setup ensures that every change is thoroughly tested and safely deployed with minimal manual intervention.

## Running the Development Server

Start the development server with:

```
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the site in action.

## Building for Production

To build the project for production:

```
npm run build
```

Once built, you can run the production server with:

```
npm run start
```

## Visit the Website

This portfolio is hosted online. Simply visit my [Portfolio](https://acharlas.github.io/portfolio/) to see it in action.

## Docker

This project includes a Dockerfile for containerized deployment. To build and run the application using Docker, use the following commands:

```
docker-compose up --build
```

This setup ensures the portfolio runs in a consistent, isolated environment.

## Contributing

This repository is primarily for my personal use, so contributions aren’t expected. However, if you spot a bug or have a suggestion that improves the project’s quality, feel free to open an issue or submit a pull request. The truth is, the code works because it’s written to be clear and functional.

## License

This project is licensed under the [MIT License](LICENSE).

---

No unnecessary embellishments—just a functional, modern portfolio that gets the job done.


[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org
[Jest.js]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[jest-url]: https://jestjs.io/
[build]: https://img.shields.io/github/actions/workflow/status/acharlas/portfolio/deploy.yml

