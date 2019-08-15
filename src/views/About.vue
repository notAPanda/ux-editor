<template>
  <div class="about">
    <h1>About 99drafts</h1>
    <p>Hi, I'm Maciek. 👋</p>
    <img class="img-fluid" :src="require('@/assets/me.jpg')" />
    <p>
      I have a dream… I want to build the best, free for everyone prototyping
      tool on the planet.
    </p>
    <p>
      There’s just one problem. Maybe two tiny, little problems called time and
      money.
    </p>
    <p>
      It turns out building free projects after hours is hard and bad for your
      health. Who would have thought of that 😅.
    </p>
    <p><b>I need your help🙏.</b></p>
    <p>
      I think it is possible to turn this side project into a full time job.
    </p>
    <p>Just give me all your money 😎.</p>
    <p>If not - fine. I woudn't 😁.</p>
    <p>There are some other ways you can contribute:</p>
    <ul>
      <li>🔥Share 99drafts on social media.</li>
      <li>
        🔥🔥🔥Join the
        <a href="https://www.facebook.com/groups/2359937920992485/"
          >Facebook group</a
        >, share your thoughts, bugs, suggestions and talk with other UX
        enthusiasts.
      </li>
      <li>
        🔥🔥<a href="https://www.buymeacoffee.com/99drafts" target="_blank"
          >Buy me a coffe</a
        >
      </li>
    </ul>
    <p>If you have any other ideas - feel free to message me.</p>
    <p>Cheers!</p>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,700|Lora|Playfair+Display:700i,900");

.img-fluid {
  max-width: 100%;
}

.about {
  font-family: "Lora";
  font-size: 21px;
  letter-spacing: -0.03px;
  line-height: 1.58;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;

  h1,
  h2,
  p,
  i,
  a,
  .first-letter,
  .authorName a {
    color: rgba(0, 0, 0, 0.84);
    text-rendering: optimizeLegibility;
  }

  h1 {
    font-family: "Lato", sans-serif;
    font-size: 48px;
    text-align: left;
    margin-bottom: 8px;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-size: 26px;
    font-weight: 700;
    padding: 0;
    margin: 56px 0 -13px -1.883px;
    text-align: left;
    line-height: 34.5px;
    letter-spacing: -0.45px;
  }

  p,
  i,
  a {
    margin-top: 21px;
  }

  a {
    text-decoration: underline;
  }

  .subtitle {
    font-family: "Lato", sans-serif;
    color: rgba(0, 0, 0, 0.54);
    margin: 0 0 24px 0;
  }
}
</style>
