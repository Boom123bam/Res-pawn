<script>
  import {
    getUserSettings,
    storeUserSettings,
  } from "../../modules/localStorage";
  let settings = getUserSettings();
  if (!settings) {
    settings = {
      sound: true,
      showAllSquareNames: false,
    };
  }
</script>

<div class="page-content">
  <section>
    <h3>Settings</h3>
    <form>
      <fieldset>
        <h6>Sound</h6>
        <input
          type="checkbox"
          id="sound-switch"
          bind:checked={settings.sound}
        />
        <label for="sound-switch" />
        <h6>Show all square names</h6>
        <input
          type="checkbox"
          id="squares-switch"
          bind:checked={settings.showAllSquareNames}
        />
        <label for="squares-switch" />
      </fieldset>
      <button
        type="submit"
        class="save cta"
        on:click={() => storeUserSettings(settings)}
        >Save Changes</button
      >
    </form>
  </section>
  <button on:click={() => console.log(settings)}>log</button>
</div>

<style>
  button.save {
    align-self: flex-start;
  }

  :root {
    --toggle-height: 1.5rem;
    --toggle-width: 3rem;
    --toggle-gap: 3px;
  }

  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
    padding: 0;
    margin: 0;
    border: none;
    position: absolute;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: var(--toggle-width);
    height: var(--toggle-height);
    background: grey;
    display: block;
    border-radius: var(--toggle-height);
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: var(--toggle-gap);
    left: var(--toggle-gap);
    width: calc(var(--toggle-height) - var(--toggle-gap) * 2);
    height: calc(var(--toggle-height) - var(--toggle-gap) * 2);
    background: #fff;
    border-radius: calc(var(--toggle-height) - var(--toggle-gap) * 2);
    transition: 0.3s;
  }

  input:checked + label {
    background: #bada55;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  label:active:after {
    width: calc(var(--toggle-height) + 5px);
  }
</style>
