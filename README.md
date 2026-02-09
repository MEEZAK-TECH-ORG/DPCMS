# DPCMS Website

A plain HTML and CSS website with multiple pages.

## Project Structure

```
dpcms/
├── index.html                    # Home page (main entry point)
├── assets/
│   ├── css/
│   │   ├── reset.css            # CSS reset styles
│   │   └── main.css             # Main stylesheet
│   ├── js/
│   │   └── main.js              # Main JavaScript file
│   ├── images/                  # Image assets
│   └── fonts/                   # Custom fonts (if needed)
├── pages/
│   ├── about/
│   │   └── index.html           # About page
│   ├── team/
│   │   └── index.html           # Our Team page
│   ├── ministry/
│   │   └── index.html           # Our Ministry page
│   ├── contact/
│   │   └── index.html           # Contact page
│   ├── register/
│   │   └── index.html           # Registration page
│   └── login/
│       └── index.html           # Login page
├── .gitignore                   # Git ignore file
└── README.md                    # Project documentation
```

## Pages

- **Home** (`/`) - Landing page (main entry point)
- **About** (`/pages/about/`) - About us information
- **Our Team** (`/pages/team/`) - Team members
- **Our Ministry** (`/pages/ministry/`) - Ministry information
- **Contact** (`/pages/contact/`) - Contact form and information
- **Register** (`/pages/register/`) - User registration
- **Login** (`/pages/login/`) - User login

## URL Structure

All pages use absolute paths starting with `/` for production-ready linking:
- CSS: `/assets/css/main.css`
- JavaScript: `/assets/js/main.js`
- Images: `/assets/images/`
- Fonts: `/assets/fonts/`
- Navigation links use absolute paths (e.g., `/pages/about/`)

## Getting Started

1. Open `index.html` in your web browser or serve via a web server
2. Navigate through the pages using the navigation menu
3. Customize the content and styles as needed

## Customization

- Edit HTML files to update content
- Modify `assets/css/main.css` for styling changes
- Add JavaScript functionality in `assets/js/main.js`
- Place images in the `assets/images/` directory
- Add custom fonts to the `assets/fonts/` directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Notes

This structure uses absolute paths (`/`) for all assets and links, making it production-ready. The folder structure allows for clean URLs:
- `/` - Homepage
- `/pages/about/` - About page
- `/pages/team/` - Team page
- etc.

## License

All rights reserved.
