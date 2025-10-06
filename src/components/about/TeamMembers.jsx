import React from 'react';

const TeamMembers = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ahnan Bashri",
      position: "Manager",
      image: "images/about/member-1.jpg"
    },
    {
      id: 2,
      name: "Joseph Min",
      position: "UI, Designer",
      image: "images/about/member-2.jpg"
    },
    {
      id: 3,
      name: "Mike Pipe",
      position: "App, Architect",
      image: "images/about/member-3.jpg"
    },
    {
      id: 4,
      name: "Klronr Jim",
      position: "Team Leader",
      image: "images/about/member-4.jpg"
    }
  ];

  return (
    <div className="row">
      {teamMembers.map(member => (
        <div key={member.id} className="col-lg-3 col-md-4 col-sm-6 u-s-m-b-30">
          <div className="team-member u-h-100">
            <div className="team-member__wrap">
              <div className="aspect aspect--bg-grey-fb aspect--square">
                <img className="aspect__img team-member__img" src={member.image} alt={member.name} />
              </div>
              <div className="team-member__social-wrap">
                <ul className="team-member__social-list">
                  <li><a className="s-tw--bgcolor-hover" href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a className="s-fb--bgcolor-hover" href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a className="s-insta--bgcolor-hover" href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a className="s-linked--bgcolor-hover" href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="team-member__info">
              <span className="team-member__name">{member.name}</span>
              <span className="team-member__job-title">{member.position}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;