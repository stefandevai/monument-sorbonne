<script>
  import PersonneImg from '$lib/assets/personne.webp';

  let { data } = $props();
  let nom = data.data['Nom'];
  let prenom = data.data['Prénoms (Mémoire des hommes)'] ?? data.data['Prénoms (Sorbonne)'] ?? data.data['Initiale'];
</script>

<main>
  <h1>{prenom} {nom}</h1>
  <img src={PersonneImg} alt="{prenom} {nom}" class="picture" />

  <div class="informations">
  </div>

  <div class="biographie text-slate-700">
    <h2 class="text-slate-800">Biographie</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut consequat erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed nec mauris eget ante consectetur tincidunt. Fusce maximus ultricies mollis. Donec ac gravida lectus. Praesent semper posuere lorem ac varius. Sed mi nibh, fermentum vel massa sit amet, scelerisque consectetur nisi. Ut mollis elit ut egestas sodales. Etiam suscipit ac dolor auctor ultricies. Aliquam eget velit sit amet tellus bibendum blandit. Nunc sed convallis ex. Fusce non metus vitae ex dictum ornare a non nisi. Morbi consequat egestas elit, sed molestie elit.</p>
    <p>Fusce odio mi, mollis eu quam ac, faucibus consequat purus. Nunc euismod magna ut ante ultricies, vel ornare arcu lacinia. Integer mollis tellus magna, nec tristique tellus feugiat at. Donec quis mollis augue, ac auctor magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a molestie ipsum, vitae luctus dui. Cras sit amet metus quis nisl euismod vulputate.</p>
    <p>Aliquam auctor velit in arcu congue bibendum. Suspendisse sagittis, lorem quis tincidunt commodo, lectus libero condimentum sem, quis dapibus justo nisl vel nulla. Sed porttitor tincidunt lorem ut efficitur. Praesent vel est mauris. Cras sed interdum arcu, eu ultricies dolor. In nec feugiat ante. Quisque et laoreet leo, a pharetra leo. Etiam commodo lectus nec elementum gravida. Donec viverra velit ut velit sollicitudin, vel ornare eros posuere. Quisque a ullamcorper felis.</p>
    <p>Maecenas gravida ante ut nibh hendrerit, in ullamcorper felis tincidunt. Curabitur vel auctor nunc, at eleifend urna. Etiam a facilisis risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent tincidunt leo lorem, sit amet dictum erat aliquet non. Mauris ut consectetur velit. Morbi sit amet dapibus purus. Nulla mollis vestibulum gravida. Integer tincidunt consequat lobortis. Quisque scelerisque urna ac nulla ullamcorper cursus ut tincidunt nunc. Aliquam sagittis sit amet nisi pretium pretium.</p>
    <p>Morbi eget sagittis mi, nec commodo lorem. Praesent est ligula, lacinia at metus ut, consequat cursus sapien. Quisque pretium feugiat neque, non elementum turpis mollis et. Curabitur varius urna neque, ac rhoncus massa pharetra ac. Pellentesque massa lacus, fringilla sed auctor a, blandit nec ipsum. Ut bibendum efficitur nisi, vitae tristique ante elementum et. Duis tempor tortor quam, at vestibulum ante tempor et. Donec aliquam, justo eu vulputate dictum, eros dolor blandit eros, tincidunt interdum erat mauris ut dui. Quisque arcu enim, rutrum et sollicitudin id, dictum eget ante.</p>
  </div>
</main>

<style lang="scss">
  main {
    padding: 2rem 16rem;
    background: white;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: "Cinzel", serif;
    color: #ebba3d;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .picture {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  .informations {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1rem;
  }
</style>
