interface AboutCredentialsProps {
  employment: string[];
  affiliations: string[];
}

export function AboutCredentials({ employment, affiliations }: AboutCredentialsProps) {
  return (
    <div className="about-credentials">
      {employment.length > 0 ? (
        <div className="about-credentials__group">
          <h2 className="about-credentials__heading">current &amp; past employment</h2>
          <ul className="about-credentials__chips" aria-label="Current and past employment">
            {employment.map((item) => (
              <li key={item}>
                <span className="about-affiliation">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {affiliations.length > 0 ? (
        <div className="about-credentials__group">
          <h2 className="about-credentials__heading">affiliations &amp; community</h2>
          <ul className="about-credentials__chips" aria-label="Affiliations and community">
            {affiliations.map((item) => (
              <li key={item}>
                <span className="about-affiliation">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
