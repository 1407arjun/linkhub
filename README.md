<p align="center">
  <a href="https://linkhub.arjuns.software">
    <img src="https://user-images.githubusercontent.com/76874556/149613161-a7a6cd6c-4ddd-4ebd-8e6a-838cb65a82c6.jpg" alt="LinkHub">
  </a>
  
  <p align="center">
  ·
  <a href="https://github.com/1407arjun/linkhub/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBug%5D%3A+">Report a bug</a>
  ·
  <a href="https://github.com/1407arjun/linkhub/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeat%5D%3A+">Request a feature</a>
  ·
  </p>
</p>

<p align="center">
    <a href="https://github.com/linkhub-org/linkhub/actions/workflows/build.yml"><img src="https://github.com/linkhub-org/linkhub/actions/workflows/build.yml/badge.svg" alt="Build"></a>
    <a href="https://github.com/linkhub-org/linkhub/actions/workflows/lint.yml"><img src="https://github.com/linkhub-org/linkhub/actions/workflows/lint.yml/badge.svg" alt="Lint"></a>
    <a href="https://github.com/1407arjun/linkhub/deployments/activity_log?environment=Production"><img src="https://img.shields.io/github/deployments/1407arjun/linkhub/production?label=Vercel%20Deploy&logo=vercel" alt="Deploy"></a>
   <a href="https://github.com/1407arjun/linkhub/releases/latest"><img src="https://img.shields.io/github/v/release/1407arjun/linkhub?label=Release" alt="Release"></a>
  </p>

<p align="center">
  <a href="https://github.com/1407arjun/linkhub/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/1407arjun/linkhub.svg?style=flat">
  </a>
  <a href="https://github.com/1407arjun/linkhub/network/members">
    <img src="https://img.shields.io/github/forks/1407arjun/linkhub?style=flat">
  </a>  
  <a href="https://github.com/1407arjun/linkhub/stargazers">
    <img src="https://img.shields.io/github/stars/1407arjun/linkhub?style=flat">
  </a>
  <a href="https://github.com/1407arjun/linkhub/issues">
    <img src="https://img.shields.io/github/issues/1407arjun/linkhub?style=flat">
  </a>
</p>

<details open="open">
  <summary><h3 style="display: inline-block">Table of Contents</h3></summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a>
      <ul>
        <li><a href="#-features">Features</a></li>
        <li><a href="#-tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## <img src="https://openclipart.org/download/307315/1538154643.svg" width="32" height="32"> About the project

LinkHub is a portal to help learners to find the best resources from those available on the World Wide Web. It builds a network of resources wherein all users can post links of resources which they have used and allowing everybody to rate them. With this, the resources are ranked based on the feedback by others who have tried and tested those, thus to provide the learner only the best of the best.

## <img src="https://noveltypharma.eu/wp-content/uploads/2020/10/icon_novel_ingredients.png" width="32" height="32"> Features

-   No signup required to access the resource data.
-   User-friendly and informative UI for desktops.
-   Markdown editor to create posts.
-   Search using tags, titles or authors.
-   Ranking of posts (resources) based on upvotes to downvotes ratio.
-   Moderation of posts using flags.

## <img src="https://techstackapps.com/media/2019/11/TechStackApps-logo-icon.png" width="32" height="32"> Tech Stack

<ul>
<li><img src=https://user-images.githubusercontent.com/76874556/149613976-7dd7bdc2-3583-4d1b-80a0-b74e43220c50.png height=32>&nbsp;React.js (Next.js)</li>
<li><img src=https://user-images.githubusercontent.com/76874556/149614005-681f67ae-c53f-4fcf-b890-36f792b6d0c8.png height=32>&nbsp;Tailwind CSS</li>
<li><img src=https://user-images.githubusercontent.com/76874556/149614022-8bef9f93-3803-408f-a93d-cb0309dc3e6b.png height=32>&nbsp;Node.js</li>
<li><img src=https://user-images.githubusercontent.com/76874556/149615033-170aa635-44f2-47cb-b905-dc17b8b7dfb1.png height=32>&nbsp;Express.js</li>
<li><img src=https://user-images.githubusercontent.com/76874556/149614058-f75c7b55-31ab-4db5-b0b1-c9a45b3e008f.png height=32>&nbsp;MongoDB</li>
<li><img src=https://user-images.githubusercontent.com/76874556/149613990-db78f233-4741-4b74-90a0-4d69fc77973e.png height=32>&nbsp;TypeScript</li>
</ul>

## <img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" width="32" height="32"> Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

In order to get a copy of the project you will require you to have Node.js (v14+) and the NPM package manager installed. If you don't have it, you can download the latest version of Node.js from the [official website](https://nodejs.org/en/download/) which also installs the NPM package manager by default.

### Installation

Open the terminal in the folder in which you wish to clone the repository and enter the following command:

```
git clone https://github.com/1407arjun/linkhub.git
cd linkhub
```

Install all the NPM packages:

```
npm i
```

In order to run the project in development mode use:

```
npm run dev
```

In order to build the project and run, use:

```
npm run build
npm start
```

> **Note that you will have to add your own `.env` file at the root directory and add your own environment variables for the project to build.**
> Following are the environment variables used:

-   `MONGODB_CLIENT_URI` - The MongoDB connection string
-   `AUTH_SECRET` - The secret used when creating a session
-   `NEXTAUTH_URL` - The domain name (usually http://localhost:300)
-   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - The Google OAuth Client ID and Client secret obtained from the [Google Cloud Console](https://console.cloud.google.com/)

## <img src="https://hpe-developer-portal.s3.amazonaws.com/uploads/media/2020/3/git-icon-1788c-1590702885345.png" width=32 height=32> Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project. [(Refer the get started instructions)](#-getting-started)
2. Create your Feature Branch. (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes. (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch. (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

## <img src="https://petpat.lv/wp-content/uploads/2018/12/license-icon-27934542-2.png" width=32 height=32> License

Distributed under the **MIT License**. See [`LICENSE`](https://github.com/Team-Fourth-Dimension/FFCSeZ/blob/master/LICENSE) for more information.

## <img src="https://www.pivotsoftware.com/uploads/images/_feature/icon-25.png" width=32 height=32> Acknowledgements

1. [Freepik](https://freepik.com) - For the background images.
2. [Bootstrap Icons](http://icons.getbootstrap.com) - For all the icons used throughout the website.
