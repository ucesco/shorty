$(function () {
  var $warning = $('#warning'),
      $shortified = $('#shortified'),
      $shortifiedLink = $shortified.find('a');

  $('#shortify').on('click', function () {
    var $this = $(this),
      $spinner = $(this).find('.spinner'),
      promise;

    $this.prop('disabled', true);
    $spinner.css('display', 'inline-block');
    $warning.hide();
    $shortified.hide();

    promise = $.post("links/create", {
      url: $('#url').val()
    });

    promise.done(function (data) {
      $spinner.hide();
      $this.prop('disabled', false);
      $shortified.show();
      $shortifiedLink.attr('href', data.url);
      $shortifiedLink.text(location.origin + '/' + data.id);
    }).fail(function (res) {
      $spinner.hide();
      $this.prop('disabled', false);

      if (res.status === 400) {
        $warning.show('slow');

        setTimeout(function () {
          $warning.hide('slow');
        }, 3000);
      }
    });
  });
});