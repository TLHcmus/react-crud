const HomePage = function () {
  return (
    <div className="mt-3">
      <h5>CRUD App </h5>
      <br />
      <p>
        Simple app using API from:{" "}
        <a href="https://reqres/in/">https://reqres/in/</a> with the following
        features:
      </p>
      <ul>
        <li>1. Login</li>
        <li>2. Add User</li>
        <li>3. Edit User</li>
        <li>4. Remove User</li>
        <li>5. Display all Users</li>
        <li>6. Filter User with Email</li>
        <li>7. Sort User by ID and First Name</li>
        <li>8. Import Users from CSV file</li>
        <li>9. Export Users to CSV file</li>
      </ul>
      <b>Tech used:</b>
      <ul>
        <li>React with Javascript</li>
        <li>Bootstrap</li>
      </ul>
    </div>
  );
};

export default HomePage;
