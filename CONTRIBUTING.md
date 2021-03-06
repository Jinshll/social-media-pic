# Contributing

Thank you for considering contributing to this little project! 😄
   - [Features you are encouraged to implement](#features-you-are-encouraged-to-implement)
   - [Development Setup](#development-setup)
   - [How to contribute](#how-to-contribute)
<p>

### Features you are encouraged to implement

---

- Chat with another user
- Private account (only followers can see the posts)
- Performance Optimized (ex. infinite scroll on post)
- Notification
- Tests

To avoid conflict, please create an issue before you start, or leave a comment if there is already one.

### Development Setup

---

1. Fork this repo
2. Clone the repo that you just forked to your Github account<br>
   ```
   git clone YOU_FORKED_REPO
   cd social-media-pic
   ```
3. Install dependencies<br>
   ```
   npm i && cd client && npm i
   ```
4. Create a `dev.js` file into `config` folder
5. Set up the `config/dev.js` file<p>
   [MongoDB Connection String](https://docs.mongodb.com/guides/server/drivers/)<br>
   SendGrid API key ? (see 6)<br>
   ```js
   module.exports = {
     MONGO_URI: 'YOUR_MongoDB_Connection_String',
     JWT_SECRET: 'YOUR_JWT_SECRET',
     SEND_GRID_API: 'YOUR_SEND_GRID_API',
     EMAIL_LINK: 'http://localhost:3000',
     EMAIL_FROM: 'YOUR_EMAIL (requested by SendGrid)',
   };
   ```
6. setting SendGrid API key
   This API is used for Forget & Reset Password, so if you're not using the Forget & Reset Password functionality,<br>
   you could just leave it(SEND_GRID_API, EMAIL_FROM) like above and comment out the **transporter** & **/reset-password route** in `routes/auth.js` like below.<p>

   - routes/auth.js

   ```js
   // const transporter = nodemailer.createTransport(
   //   sgTransport({
   //     auth: {
   //       api_key: SEND_GRID_API,
   //     },
   //   })
   // );

   // router.post('/reset-password', (req, res) => {
   //    ...
   //    .catch(console.log);
   //   })
   // });
   ```

   &emsp;ps. Or you could create your own SendGrid API<br>
   &emsp;&emsp;[Create SendGrid API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key)<p>

   - The email put in 'EMAIL_FROM' is requested to be verified by SendGrid before they help delivering an email to the user.<br>

7. Change Cloudinary setting from prod to dev in the below 2 files.<br>

   - `components/create-post.component.jsx` file
   - `components/edit-profile.component.jsx` file<p>

   Make sure to comment out the **prod** settings and use the **dev** ones like below.<br>

   ```js
   // dev
   formData.append('upload_preset', 'social-media-pic-dev');
   formData.append('folder', `silhouette-test/${user._id}/avatar`);

   // prod
   // formData.append('upload_preset', 'social-media-pic');
   // formData.append('folder', `silhouette-prod/${user._id}/avatar`);
   ```

   &emsp;ps. Or you could create your own Cloudinary API and have the settings in these two file.<br>
   &emsp;&emsp;&emsp;See [Optional](#optional)<p>

8. Run the project
   ```
   npm run dev
   ```
   <p>

#### Optional

Create your [Cloudinary API](https://cloudinary.com/documentation/fetch_remote_images) & set up [upload presets](https://cloudinary.com/documentation/upload_presets)

1. Add Cloudinary `IMG_UPLOAD_URL` to `assets/api-call.js`
2. Add [Cloudinary](https://cloudinary.com/users/login) `upload_preset` & `cloud_name` to the below 2 files.

   - `components/create-post.component.jsx` file
   - `components/edit-profile.component.jsx` file

   ```js
   formData.append('upload_preset', 'YOUR_UPLOAD_PRESETS_NAME');
   formData.append('cloud_name', 'YOUR_CLOUD_NAME');
   formData.append('folder', 'silhouette-test');
   ```

   <p>

### How to contribute

---

1. Provide detailed description about the changes you have made and the expected outcome.
2. Sync your clone with the original repo (get the latest updates)
   ```
   git remote add upstream https://github.com/lhcjun/social-media-pic.git
   git pull upstream master
   ```
3. Create a branch
   ```
   git checkout -b <new_branch_name>
   ```
4. Commit and push the code to your fork
5. Create a pull request to have the changes merged from your fork into the origin
