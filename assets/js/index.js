$("#add_user").submit(function (event) {
  alert("Data Inserted Successfully");
});

// update the data in the mongodb

$("#updateTheUser").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  console.log(unindexed_array);
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    // url: `http://localhost:3000/api/users/${data.id}`,
    url: `http://localhost:3000/api/users/${data._id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated");
  });
});

//user delete
if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      // url: `http://localhost:3000/api/users/${data.id}`,
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do You really want to delete this record")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Succfully");
        location.reload();
      });
    }
  });
}
