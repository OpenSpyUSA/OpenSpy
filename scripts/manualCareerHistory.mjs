const positionRecord = (label, summary) => ({
  category: 'position',
  label,
  summary,
})

export const manualCareerHistoryById = {
  'executive-donald-j-trump': [
    {
      category: 'position',
      label: 'Trump Organization',
      summary:
        '1971-2017: Led the Trump family real-estate business and expanded it into hotels, golf properties, licensing, and branding.',
    },
    {
      category: 'position',
      label: 'Television and branding',
      summary:
        '2004-2015: National television figure as host and producer of The Apprentice while continuing to build the Trump brand.',
    },
    {
      category: 'position',
      label: 'President of the United States',
      summary: '2017-2021: 45th president of the United States.',
    },
    {
      category: 'position',
      label: 'Post-presidency campaign period',
      summary:
        '2021-2025: Remained the dominant figure in Republican national politics and won a second nonconsecutive term in 2024.',
    },
    {
      category: 'position',
      label: 'President of the United States',
      summary: '2025-present: 47th president of the United States.',
    },
  ],
  'executive-jd-vance': [
    {
      category: 'position',
      label: 'United States Marine Corps',
      summary: '2003-2007: Served in the U.S. Marine Corps, including a deployment to Iraq.',
    },
    {
      category: 'position',
      label: 'Law, writing, and venture capital',
      summary:
        '2013-2022: Yale-trained lawyer, bestselling author of Hillbilly Elegy, and venture-capital investor.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-2025: U.S. senator from Ohio.',
    },
    {
      category: 'position',
      label: 'Vice President of the United States',
      summary: '2025-present: 50th vice president of the United States.',
    },
  ],
  'executive-scott-bessent': [
    {
      category: 'position',
      label: 'Brown Brothers Harriman',
      summary: '1984-1991: Banker at Brown Brothers Harriman.',
    },
    {
      category: 'position',
      label: 'Soros Fund Management',
      summary:
        '1991-2000 and 2011-2015: Investor at Soros Fund Management, including a later stint as chief investment officer.',
    },
    {
      category: 'position',
      label: 'Key Square Group',
      summary: '2015-2025: Founded and led the hedge fund Key Square Group.',
    },
    {
      category: 'position',
      label: 'Secretary of the Treasury',
      summary: '2025-present: U.S. secretary of the Treasury.',
    },
  ],
  'executive-pam-bondi': [
    {
      category: 'position',
      label: 'Hillsborough County prosecutor',
      summary: '1991-2010: Prosecutor in Hillsborough County, Florida.',
    },
    {
      category: 'position',
      label: 'Florida Attorney General',
      summary: '2011-2019: Florida attorney general.',
    },
    {
      category: 'position',
      label: 'Trump legal and policy roles',
      summary:
        "2020-2024: Worked in pro-Trump legal and policy roles, including Trump's first impeachment defense team.",
    },
    {
      category: 'position',
      label: 'Attorney General',
      summary: '2025-present: U.S. attorney general.',
    },
  ],
  'executive-doug-burgum': [
    {
      category: 'position',
      label: 'Great Plains Software',
      summary:
        '1983-2001: Built Great Plains Software from a startup into a major accounting-software company.',
    },
    {
      category: 'position',
      label: 'Microsoft',
      summary:
        '2001-2007: Microsoft senior executive after the company acquired Great Plains Software.',
    },
    {
      category: 'position',
      label: 'North Dakota business ventures',
      summary:
        '2008-2016: Investor and business leader in North Dakota, including work through Kilbourne Group and Arthur Ventures.',
    },
    {
      category: 'position',
      label: 'Governor of North Dakota',
      summary: '2016-2024: Governor of North Dakota.',
    },
    {
      category: 'position',
      label: 'Secretary of the Interior',
      summary: '2025-present: U.S. secretary of the Interior.',
    },
  ],
  'executive-lori-chavez-deremer': [
    {
      category: 'position',
      label: 'Small business and local politics',
      summary:
        '2000s: Worked in medical-imaging business operations before rising in local politics in Oregon.',
    },
    {
      category: 'position',
      label: 'Mayor of Happy Valley',
      summary: '2011-2019: Mayor of Happy Valley, Oregon.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-2025: U.S. representative for Oregon's 5th congressional district.",
    },
    {
      category: 'position',
      label: 'Secretary of Labor',
      summary: '2025-present: U.S. secretary of Labor.',
    },
  ],
  'executive-doug-collins': [
    {
      category: 'position',
      label: 'Pastor, lawyer, and chaplain',
      summary: '1990s-2000s: Baptist pastor, lawyer, and U.S. Air Force Reserve chaplain.',
    },
    {
      category: 'position',
      label: 'Georgia House of Representatives',
      summary: '2007-2013: Member of the Georgia House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2021: U.S. representative for Georgia's 9th congressional district.",
    },
    {
      category: 'position',
      label: 'Secretary of Veterans Affairs',
      summary: '2025-present: U.S. secretary of Veterans Affairs.',
    },
  ],
  'executive-sean-duffy': [
    {
      category: 'position',
      label: 'Ashland County district attorney',
      summary: '2002-2010: District attorney of Ashland County, Wisconsin.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-2019: U.S. representative for Wisconsin's 7th congressional district.",
    },
    {
      category: 'position',
      label: 'Television and media work',
      summary: '2019-2024: Media commentator and Fox Business host.',
    },
    {
      category: 'position',
      label: 'Secretary of Transportation',
      summary: '2025-present: U.S. secretary of Transportation.',
    },
  ],
  'executive-pete-hegseth': [
    {
      category: 'position',
      label: 'Army National Guard',
      summary:
        '2003-2021: Army National Guard officer with deployments to Guantanamo Bay, Iraq, and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Vets for Freedom',
      summary: '2007-2012: Led Vets for Freedom.',
    },
    {
      category: 'position',
      label: 'Concerned Veterans for America',
      summary: '2012-2016: Headed Concerned Veterans for America.',
    },
    {
      category: 'position',
      label: 'Fox News',
      summary: '2014-2024: Fox News commentator and weekend host.',
    },
    {
      category: 'position',
      label: 'Secretary of Defense',
      summary: '2025-present: U.S. secretary of Defense.',
    },
  ],
  'executive-robert-f-kennedy-jr': [
    {
      category: 'position',
      label: 'Environmental law',
      summary:
        '1980s-2010s: Environmental lawyer, including long runs with Riverkeeper and the Natural Resources Defense Council.',
    },
    {
      category: 'position',
      label: 'Waterkeeper Alliance',
      summary: '1999-2023: Cofounder and longtime leader of Waterkeeper Alliance.',
    },
    {
      category: 'position',
      label: "Children's Health Defense",
      summary: "2015-2024: Led Children's Health Defense and became a national vaccine-skeptic activist.",
    },
    {
      category: 'position',
      label: '2024 presidential campaign',
      summary: '2024: Ran for president and later endorsed Donald Trump.',
    },
    {
      category: 'position',
      label: 'Secretary of Health and Human Services',
      summary: '2025-present: U.S. secretary of Health and Human Services.',
    },
  ],
  'executive-howard-lutnick': [
    {
      category: 'position',
      label: 'Cantor Fitzgerald',
      summary:
        '1983-1991: Joined Cantor Fitzgerald and rose from trader to president and chief executive.',
    },
    {
      category: 'position',
      label: 'Cantor Fitzgerald after 9/11',
      summary:
        '2001-2025: Chairman and chief executive of Cantor Fitzgerald after the September 11 attacks.',
    },
    {
      category: 'position',
      label: 'BGC Partners and Newmark',
      summary:
        '2000s-2020s: Also led BGC Partners and Newmark as those businesses grew out of Cantor.',
    },
    {
      category: 'position',
      label: 'Secretary of Commerce',
      summary: '2025-present: U.S. secretary of Commerce.',
    },
  ],
  'executive-linda-mcmahon': [
    {
      category: 'position',
      label: 'World Wrestling Entertainment',
      summary:
        '1980-2009: Helped build World Wrestling Federation/World Wrestling Entertainment and served as chief executive.',
    },
    {
      category: 'position',
      label: 'U.S. Senate campaigns',
      summary: '2010 and 2012: Ran for the U.S. Senate in Connecticut.',
    },
    {
      category: 'position',
      label: 'Small Business Administration',
      summary: '2017-2019: Administrator of the Small Business Administration.',
    },
    {
      category: 'position',
      label: 'America First Policy Institute',
      summary: '2021-2025: Chair of America First Policy Institute.',
    },
    {
      category: 'position',
      label: 'Secretary of Education',
      summary: '2025-present: U.S. secretary of Education.',
    },
  ],
  'executive-kristi-noem': [
    {
      category: 'position',
      label: 'South Dakota House of Representatives',
      summary: '2007-2011: Member of the South Dakota House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-2019: U.S. representative for South Dakota's at-large district.",
    },
    {
      category: 'position',
      label: 'Governor of South Dakota',
      summary: '2019-2025: Governor of South Dakota.',
    },
    {
      category: 'position',
      label: 'Secretary of Homeland Security',
      summary: '2025-present: U.S. secretary of Homeland Security.',
    },
  ],
  'executive-brooke-rollins': [
    {
      category: 'position',
      label: 'Texas policy work',
      summary:
        '1990s-2003: Staff lawyer and policy aide in Texas government, including work for Governor Rick Perry.',
    },
    {
      category: 'position',
      label: 'Texas Public Policy Foundation',
      summary: '2003-2018: President and CEO of the Texas Public Policy Foundation.',
    },
    {
      category: 'position',
      label: 'White House Domestic Policy Council',
      summary: "2018-2020: White House domestic policy director in Trump's first term.",
    },
    {
      category: 'position',
      label: 'America First Policy Institute',
      summary: '2021-2025: President and CEO of America First Policy Institute.',
    },
    {
      category: 'position',
      label: 'Secretary of Agriculture',
      summary: '2025-present: U.S. secretary of Agriculture.',
    },
  ],
  'executive-marco-rubio': [
    {
      category: 'position',
      label: 'West Miami',
      summary: '1998-2000: West Miami city commissioner.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary:
        '2000-2008: Member of the Florida House of Representatives, including service as speaker.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-2025: U.S. senator from Florida.',
    },
    {
      category: 'position',
      label: 'Secretary of State',
      summary: '2025-present: U.S. secretary of State.',
    },
  ],
  'executive-scott-turner': [
    {
      category: 'position',
      label: 'National Football League',
      summary: '1995-2003: Played in the NFL as a defensive back.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2013-2017: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'White House Opportunity and Revitalization Council',
      summary:
        "2019-2021: Executive director of the White House Opportunity and Revitalization Council in Trump's first term.",
    },
    {
      category: 'position',
      label: 'Secretary of Housing and Urban Development',
      summary: '2025-present: U.S. secretary of Housing and Urban Development.',
    },
  ],
  'executive-chris-wright': [
    {
      category: 'position',
      label: 'Pinnacle Technologies',
      summary:
        '1992-2006: Founded Pinnacle Technologies, an early hydraulic-fracturing and shale-services company.',
    },
    {
      category: 'position',
      label: 'Stroud Energy',
      summary: '2006-2010: Chairman of Stroud Energy.',
    },
    {
      category: 'position',
      label: 'Liberty Energy',
      summary: '2011-2025: Founder, chairman, and chief executive of Liberty Energy.',
    },
    {
      category: 'position',
      label: 'Secretary of Energy',
      summary: '2025-present: U.S. secretary of Energy.',
    },
  ],
  'executive-jerome-h-powell': [
    {
      category: 'position',
      label: 'Law and investment banking',
      summary: 'Late 1970s-1990: Worked as a lawyer and investment banker in New York City.',
    },
    {
      category: 'position',
      label: 'Treasury Department',
      summary:
        '1990-1993: Served in the George H.W. Bush administration, including as under secretary of the Treasury for domestic finance.',
    },
    {
      category: 'position',
      label: 'The Carlyle Group',
      summary: '1997-2005: Partner at The Carlyle Group.',
    },
    {
      category: 'position',
      label: 'Bipartisan Policy Center and board service',
      summary:
        '2005-2012: Corporate board member and later visiting scholar at the Bipartisan Policy Center focused on fiscal issues.',
    },
    {
      category: 'position',
      label: 'Federal Reserve',
      summary:
        '2012-present: Member of the Federal Reserve Board of Governors; chair since 2018 and reappointed in 2022.',
    },
  ],
  'executive-paul-s-atkins': [
    {
      category: 'position',
      label: 'Corporate law practice',
      summary:
        '1980s-1990: Corporate lawyer in New York and Paris working on securities offerings, mergers, and acquisitions.',
    },
    {
      category: 'position',
      label: 'SEC staff roles',
      summary:
        '1990-1994: Served on the staff of SEC chairs Richard Breeden and Arthur Levitt, ultimately as chief of staff and counselor.',
    },
    {
      category: 'position',
      label: 'SEC commissioner',
      summary: '2002-2008: Commissioner at the Securities and Exchange Commission.',
    },
    {
      category: 'position',
      label: 'Patomak Global Partners',
      summary:
        '2009-2025: Founded and led Patomak Global Partners, a financial-regulatory consulting firm, and worked on digital-asset policy.',
    },
    {
      category: 'position',
      label: 'Chair of the Securities and Exchange Commission',
      summary: '2025-present: Chair of the Securities and Exchange Commission.',
    },
  ],
  'executive-andrew-n-ferguson': [
    {
      category: 'position',
      label: 'Judicial clerkships and private practice',
      summary:
        '2010s: Clerked for Judge Karen LeCraft Henderson and Justice Clarence Thomas, then practiced law in Washington.',
    },
    {
      category: 'position',
      label: 'U.S. Senate Republican counsel',
      summary:
        'Late 2010s-2022: Worked on the Senate Judiciary Committee and later became chief counsel to Senate Republican leader Mitch McConnell.',
    },
    {
      category: 'position',
      label: 'Solicitor General of Virginia',
      summary: '2022-2024: Solicitor general of Virginia.',
    },
    {
      category: 'position',
      label: 'Federal Trade Commission',
      summary: '2024-present: FTC commissioner; chair since 2025.',
    },
  ],
  'executive-brendan-carr': [
    {
      category: 'position',
      label: 'Telecom law practice',
      summary:
        '2005-2012: Telecommunications lawyer at Wiley Rein after law school and an earlier FCC internship.',
    },
    {
      category: 'position',
      label: 'FCC staff and counsel roles',
      summary:
        '2012-2017: Served at the FCC as a staff attorney, advisor to Commissioner Ajit Pai, and then general counsel.',
    },
    {
      category: 'position',
      label: 'FCC commissioner',
      summary: '2017-2025: Commissioner at the Federal Communications Commission.',
    },
    {
      category: 'position',
      label: 'Chair of the Federal Communications Commission',
      summary: '2025-present: Chair of the Federal Communications Commission.',
    },
  ],
  'executive-michael-s-selig': [
    {
      category: 'position',
      label: 'Early derivatives-regulation work',
      summary:
        '2010s: Built a legal career around derivatives and market-regulation work, including a clerkship for then-CFTC Commissioner J. Christopher Giancarlo.',
    },
    {
      category: 'position',
      label: 'Private practice',
      summary:
        '2010s-2025: Private-practice lawyer advising clients on derivatives, securities regulation, and digital-asset matters; later became a law-firm partner.',
    },
    {
      category: 'position',
      label: 'SEC Crypto Task Force',
      summary:
        '2025: Chief counsel of the SEC Crypto Task Force and senior advisor to SEC Chair Paul S. Atkins.',
    },
    {
      category: 'position',
      label: 'Chair of the Commodity Futures Trading Commission',
      summary: '2025-present: Chair of the Commodity Futures Trading Commission.',
    },
  ],
  'house-sara-jacobs-california-51st': [
    {
      category: 'position',
      label: 'Global policy and humanitarian work',
      summary:
        '2010s: Worked on international security, development, and humanitarian policy at the State Department, the United Nations, and UNICEF, and advised Hillary Clinton on foreign policy in 2016.',
    },
    {
      category: 'position',
      label: 'Project Connect and San Diego for Every Child',
      summary:
        '2010s-2020: Founded Project Connect and later San Diego for Every Child to connect families with public-benefit and anti-poverty programs.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for California's 51st congressional district.",
    },
  ],
  'house-josh-harder-california-9th': [
    {
      category: 'position',
      label: 'Business and economic-growth work',
      summary:
        '2010s: Worked in business and investment roles focused on job growth and expanding economic opportunity.',
    },
    {
      category: 'position',
      label: 'Teaching',
      summary: '2010s: Taught business and public-policy courses at Modesto Junior College.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for California's 9th congressional district.",
    },
  ],
  'house-kevin-kiley-california-3rd': [
    {
      category: 'position',
      label: 'Teaching, law, and prosecution',
      summary:
        '2010s: Worked as a high-school teacher, lawyer, and deputy California attorney general before running for office.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2016-2022: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for California's 3rd congressional district.",
    },
  ],
  'house-derek-tran-california-45th': [
    {
      category: 'position',
      label: 'United States Army Reserve',
      summary: '2010s: Served for eight years in the U.S. Army Reserve.',
    },
    {
      category: 'position',
      label: 'Public-safety and local civic work',
      summary:
        '2010s-2020s: Worked on public-safety policy for the Los Angeles mayor and served on the Orange Traffic Commission.',
    },
    {
      category: 'position',
      label: 'Law and small business',
      summary:
        '2010s-2024: Built a legal practice representing workers and consumers and helped run an independent pharmacy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 45th congressional district.",
    },
  ],
  'house-eric-swalwell-california-14th': [
    {
      category: 'position',
      label: 'Prosecution',
      summary:
        '2000s-2012: Prosecutor in Alameda County, including service in the hate-crimes unit.',
    },
    {
      category: 'position',
      label: 'Dublin City Council',
      summary: '2010-2012: Member of the Dublin City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2013-present: U.S. representative for East Bay districts, now California's 14th congressional district.",
    },
  ],
  'house-pete-aguilar-california-33rd': [
    {
      category: 'position',
      label: 'Redlands City Council',
      summary: '2006-2014: Member of the Redlands City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Redlands',
      summary: '2010-2014: Mayor of Redlands, California.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2015-present: U.S. representative for Inland Empire districts, now California's 33rd congressional district.",
    },
  ],
  'house-vince-fong-california-20th': [
    {
      category: 'position',
      label: 'Congressional policy and district work',
      summary:
        "2000s-2016: Worked on trade and tax issues for Representative Bill Thomas and later served for years as Kevin McCarthy's district director.",
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2016-2024: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2024-present: U.S. representative for California's 20th congressional district.",
    },
  ],
  'house-mike-levin-california-49th': [
    {
      category: 'position',
      label: 'Environmental law',
      summary:
        '2000s-2018: Environmental attorney focused on clean-energy, climate, and public-interest issues.',
    },
    {
      category: 'position',
      label: 'Clean-energy and sustainability leadership',
      summary:
        '2010s: Helped lead regional clean-energy and sustainability work, including roles with the Center for Sustainable Energy and Sustain OC.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for California's 49th congressional district.",
    },
  ],
  'house-adam-gray-california-13th': [
    {
      category: 'position',
      label: 'California legislative staff and business work',
      summary:
        '2000-2011: Worked in the California State Assembly and State Senate, while also operating a business in the Central Valley.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2012-2022: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'UC Merced',
      summary:
        '2010s-2020s: Served as an instructor at UC Merced and as associate director of the Center for Analytic Political Engagement.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 13th congressional district.",
    },
  ],
  'house-david-valadao-california-22nd': [
    {
      category: 'position',
      label: 'Dairy farming and agribusiness',
      summary:
        '2000s-2010: Worked in his family dairy business and held leadership roles in the California dairy industry.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2010-2012: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2019: U.S. representative for California's old 21st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2021-present: Returned to Congress and now represents California's 22nd congressional district.",
    },
  ],
  'house-robert-garcia-california-42nd': [
    {
      category: 'position',
      label: 'Education and community leadership',
      summary:
        '2000s: Worked in education and civic-leadership roles in Long Beach before elective office.',
    },
    {
      category: 'position',
      label: 'Long Beach City Council',
      summary: '2009-2014: Member of the Long Beach City Council; deputy mayor from 2012 to 2014.',
    },
    {
      category: 'position',
      label: 'Mayor of Long Beach',
      summary: '2014-2022: Mayor of Long Beach, California.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for California's 42nd congressional district.",
    },
  ],
  'house-lateefah-simon-california-12th': [
    {
      category: 'position',
      label: "Young Women's Freedom Center",
      summary:
        "1990s-2000s: Organizer and later executive director of the Young Women's Freedom Center, working with women and girls affected by the justice and foster-care systems.",
    },
    {
      category: 'position',
      label: 'Criminal-justice and civil-rights leadership',
      summary:
        "2000s-2010s: Led San Francisco's Back on Track program and later the Lawyers' Committee for Civil Rights of the San Francisco Bay Area, while also serving in foundation leadership roles.",
    },
    {
      category: 'position',
      label: 'BART and CSU governance',
      summary:
        '2016-2024: Served on the BART Board, including as president from 2020 to 2024, and on the California State University Board of Trustees.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 12th congressional district.",
    },
  ],
  'house-nanette-barragan-california-44th': [
    {
      category: 'position',
      label: 'Public liaison, civil-rights, and legal work',
      summary:
        '1990s-2010s: Worked in the Clinton White House, in civil-rights and legal-aid roles, and later in private law practice.',
    },
    {
      category: 'position',
      label: 'Hermosa Beach City Council',
      summary: '2013-2015: Member of the Hermosa Beach City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Hermosa Beach',
      summary: '2015-2016: Mayor of Hermosa Beach, California.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 44th congressional district.",
    },
  ],
  'house-ro-khanna-california-17th': [
    {
      category: 'position',
      label: 'Law and teaching',
      summary:
        '2000s-2016: Practiced law and taught economics and law at Stanford University, Santa Clara University, and San Francisco State University.',
    },
    {
      category: 'position',
      label: 'Commerce Department',
      summary:
        '2009-2011: Served as deputy assistant secretary of commerce in the Obama administration, working on trade missions and export policy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 17th congressional district.",
    },
  ],
  'house-dave-min-california-47th': [
    {
      category: 'position',
      label: 'Securities enforcement',
      summary:
        '2000s: Began his legal career as an enforcement attorney at the Securities and Exchange Commission.',
    },
    {
      category: 'position',
      label: 'UC Irvine School of Law',
      summary:
        '2010s-2020: Law professor and business-law scholar focused on banking, housing, and consumer-finance policy.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2020-2024: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 47th congressional district.",
    },
  ],
  'house-jimmy-gomez-california-34th': [
    {
      category: 'position',
      label: 'Congressional and labor-organizing work',
      summary:
        '2000s-2012: Worked for Representative Hilda Solis and later became political director of the United Nurses Association of California.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary:
        '2012-2017: Member of the California State Assembly, including service as majority whip.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 34th congressional district.",
    },
  ],
  'house-george-whitesides-california-27th': [
    {
      category: 'position',
      label: 'NASA',
      summary:
        '2000s-2010s: Served as chief of staff at NASA during the Obama administration and helped lead major agency reforms.',
    },
    {
      category: 'position',
      label: 'Virgin Galactic',
      summary:
        '2010s-2020s: Became the first chief executive of Virgin Galactic and helped grow it into a major aerospace company in the Antelope Valley.',
    },
    {
      category: 'position',
      label: 'Regional civic and wildfire-resilience work',
      summary:
        '2020s: Co-chaired the Antelope Valley COVID-19 Task Force and cofounded a nonprofit focused on wildfire and insurance resilience.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 27th congressional district.",
    },
  ],
  'house-luz-rivas-california-29th': [
    {
      category: 'position',
      label: 'Engineering and STEM education',
      summary:
        '1990s-2010s: Worked as an electrical engineer and later moved into education to expand STEM opportunities.',
    },
    {
      category: 'position',
      label: 'DIY Girls',
      summary:
        '2010s: Founded DIY Girls, a nonprofit that helps girls pursue technology and engineering through mentoring and hands-on programs.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2018-2024: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 29th congressional district.",
    },
  ],
  'house-raul-ruiz-california-25th': [
    {
      category: 'position',
      label: 'Emergency medicine and global health',
      summary:
        '2000s-2012: Trained in emergency medicine, worked internationally in public health, and practiced as an emergency-room doctor in the Coachella Valley.',
    },
    {
      category: 'position',
      label: 'Medical education and local health initiatives',
      summary:
        '2010s: Served as a senior associate dean at the UC Riverside School of Medicine, helped open a free clinic, and launched the Coachella Valley Healthcare Initiative.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 25th congressional district.",
    },
  ],
  'house-sydney-kamlager-dove-california-37th': [
    {
      category: 'position',
      label: 'Nonprofit and community advocacy work',
      summary:
        '2000s-2010s: Worked on job creation, arts, and community-uplift programs in Los Angeles through nonprofit and advocacy roles.',
    },
    {
      category: 'position',
      label: 'Los Angeles Community College District Board',
      summary: '2015-2018: Member of the Los Angeles Community College District Board of Trustees.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2018-2021: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2021-2022: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for California's 37th congressional district.",
    },
  ],
  'house-gilbert-cisneros-california-31st': [
    {
      category: 'position',
      label: 'United States Navy and philanthropy',
      summary:
        '1989-2018: Served in the U.S. Navy and later launched scholarship and college-access philanthropy with his family foundation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-2021: U.S. representative for California's 39th congressional district.",
    },
    {
      category: 'position',
      label: 'Department of Defense',
      summary:
        '2021-2023: Under secretary of defense for personnel and readiness, later also serving as the Pentagon\'s chief diversity and inclusion officer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 31st congressional district.",
    },
  ],
  'house-jay-obernolte-california-23rd': [
    {
      category: 'position',
      label: 'Technology and game development',
      summary:
        '1990s-2014: Built a career in software, technology, and video-game development as an engineer and entrepreneur.',
    },
    {
      category: 'position',
      label: 'Big Bear Lake local office',
      summary: '2010s: Served on the Big Bear Lake City Council and later as mayor.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2014-2020: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for California's 23rd congressional district.",
    },
  ],
  'house-kevin-mullin-california-15th': [
    {
      category: 'position',
      label: 'Legislative staff and entrepreneurship',
      summary:
        '1990s-2000s: Worked for State Senator Jackie Speier and also operated as an entrepreneur before local elected office.',
    },
    {
      category: 'position',
      label: 'South San Francisco City Council',
      summary: '2007-2012: Member of the South San Francisco City Council; mayor from 2010 to 2011.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary:
        '2012-2022: Member of the California State Assembly, including long service as speaker pro tempore.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for California's 15th congressional district.",
    },
  ],
  'house-sam-liccardo-california-16th': [
    {
      category: 'position',
      label: 'Federal and local prosecution',
      summary:
        '1998-2006: Served as an assistant U.S. attorney in San Diego and later as a deputy district attorney in Santa Clara County.',
    },
    {
      category: 'position',
      label: 'San Jose City Council',
      summary: '2007-2015: Member of the San Jose City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of San Jose',
      summary: '2015-2023: Mayor of San Jose, California.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 16th congressional district.",
    },
  ],
  'house-jimmy-panetta-california-19th': [
    {
      category: 'position',
      label: 'Prosecution',
      summary:
        '1996-2016: Prosecutor in Alameda County and later Monterey County, including gang and violent-crime cases.',
    },
    {
      category: 'position',
      label: 'United States Navy Reserve',
      summary:
        '2003-2011: Served as a Navy Reserve intelligence officer, including deployment to Afghanistan in 2007-2008.',
    },
    {
      category: 'position',
      label: 'Veterans advocacy and county civic work',
      summary:
        '2010s: Helped establish Monterey County\'s veterans treatment court and worked on the Central Coast Veterans Cemetery project.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 19th congressional district.",
    },
  ],
  'house-ted-lieu-california-36th': [
    {
      category: 'position',
      label: 'United States Air Force',
      summary:
        '1990s-2021: Served on active duty and in the Air Force Reserve as a JAG officer, retiring as a colonel.',
    },
    {
      category: 'position',
      label: 'Torrance City Council',
      summary: '2002-2005: Member of the Torrance City Council.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2005-2010: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2011-2014: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for California's 36th congressional district.",
    },
  ],
  'house-linda-sanchez-california-38th': [
    {
      category: 'position',
      label: 'Labor and employment law',
      summary:
        '1990s-2002: Worked as a labor and employment lawyer representing working people before running for Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for California's 38th congressional district.",
    },
    {
      category: 'position',
      label: 'House leadership and committee roles',
      summary:
        '2010s-2020s: Held senior House leadership and committee posts, including vice chair of the Democratic Caucus and ranking roles on Ways and Means subcommittees.',
    },
  ],
  'house-michael-baumgartner-washington-5th': [
    {
      category: 'position',
      label: 'Consulting and overseas public service',
      summary:
        '2000s: Worked in consulting and overseas public-service roles, including State Department service in Baghdad and counternarcotics work in Afghanistan.',
    },
    {
      category: 'position',
      label: 'Washington State Senate',
      summary: '2011-2019: Member of the Washington State Senate.',
    },
    {
      category: 'position',
      label: 'Spokane County treasurer',
      summary: '2019-2025: Spokane County treasurer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Washington's 5th congressional district.",
    },
  ],
  'house-suzan-delbene-washington-1st': [
    {
      category: 'position',
      label: 'Medical research',
      summary: '1980s-1990: Worked in medical research before business school.',
    },
    {
      category: 'position',
      label: 'Technology executive and entrepreneur',
      summary:
        '1990s-2010: Held technology and startup leadership roles, including at Microsoft, drugstore.com, and Nimble Technology.',
    },
    {
      category: 'position',
      label: 'Washington State Department of Revenue',
      summary: '2010-2012: Director of the Washington State Department of Revenue.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2012-present: U.S. representative for Washington's 1st congressional district.",
    },
  ],
  'house-pramila-jayapal-washington-7th': [
    {
      category: 'position',
      label: 'Finance and global health work',
      summary:
        '1990s-2000s: Worked in finance and later in global health and development, including nearly a decade at PATH.',
    },
    {
      category: 'position',
      label: 'OneAmerica',
      summary: '2001-2012: Founded and led OneAmerica, a major immigrant-rights organization in Washington.',
    },
    {
      category: 'position',
      label: 'Washington State Senate',
      summary: '2015-2016: Member of the Washington State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Washington's 7th congressional district.",
    },
  ],
  'house-rick-larsen-washington-2nd': [
    {
      category: 'position',
      label: 'Public affairs and economic development',
      summary:
        '1990s: Worked in public affairs and regional economic-development roles in Washington before elective office.',
    },
    {
      category: 'position',
      label: 'Snohomish County Council',
      summary: '1998-2000: Member of the Snohomish County Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-present: U.S. representative for Washington's 2nd congressional district.",
    },
  ],
  'house-dan-newhouse-washington-4th': [
    {
      category: 'position',
      label: 'Farming and agribusiness',
      summary: '1980s-2000s: Farmer and agribusiness leader in central Washington.',
    },
    {
      category: 'position',
      label: 'Washington House of Representatives',
      summary: '2003-2009: Member of the Washington House of Representatives.',
    },
    {
      category: 'position',
      label: 'Washington State Department of Agriculture',
      summary: '2009-2013: Director of the Washington State Department of Agriculture.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Washington's 4th congressional district.",
    },
  ],
  'house-marie-perez-washington-3rd': [
    {
      category: 'position',
      label: 'Small business owner',
      summary:
        '2010s-2022: Co-owned and helped run an auto repair and machine shop in southwest Washington.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Washington's 3rd congressional district.",
    },
  ],
  'house-emily-randall-washington-6th': [
    {
      category: 'position',
      label: 'Fundraising, nonprofit, and health advocacy work',
      summary: '2010s: Worked in higher-education fundraising, nonprofit roles, and health-care advocacy.',
    },
    {
      category: 'position',
      label: 'Washington State Senate',
      summary: '2019-2024: Member of the Washington State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Washington's 6th congressional district.",
    },
  ],
  'house-kim-schrier-washington-8th': [
    {
      category: 'position',
      label: 'Environmental Protection Agency',
      summary: '1990s: Worked at the Environmental Protection Agency before medical training.',
    },
    {
      category: 'position',
      label: 'Pediatric medicine',
      summary: '2000s-2018: Pediatrician in the Seattle-area and Issaquah region.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Washington's 8th congressional district.",
    },
  ],
  'house-adam-smith-washington-9th': [
    {
      category: 'position',
      label: 'Law and prosecution',
      summary: '1990s: Worked as a lawyer and local prosecutor in the Seattle area.',
    },
    {
      category: 'position',
      label: 'Washington State Senate',
      summary: '1991-1997: Member of the Washington State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Washington's 9th congressional district.",
    },
  ],
  'house-marilyn-strickland-washington-10th': [
    {
      category: 'position',
      label: 'Marketing and business leadership',
      summary: '1990s-2000s: Held marketing and business-leadership roles in the public and private sectors.',
    },
    {
      category: 'position',
      label: 'Tacoma City Council',
      summary: '2008-2009: Member of the Tacoma City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Tacoma',
      summary: '2010-2017: Mayor of Tacoma.',
    },
    {
      category: 'position',
      label: 'Seattle Metropolitan Chamber of Commerce',
      summary: '2018-2020: President and chief executive of the Seattle Metropolitan Chamber of Commerce.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Washington's 10th congressional district.",
    },
  ],
  'house-bryan-steil-wisconsin-1st': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary: '2003-2004: Staff aide to Representative Paul Ryan.',
    },
    {
      category: 'position',
      label: 'Law and manufacturing work',
      summary:
        '2000s-2018: Worked as a lawyer and later in southeast Wisconsin manufacturing, including about a decade in private-sector industry.',
    },
    {
      category: 'position',
      label: 'University of Wisconsin Board of Regents',
      summary: '2016-2018: Member of the University of Wisconsin Board of Regents.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Wisconsin's 1st congressional district.",
    },
  ],
  'house-mark-pocan-wisconsin-2nd': [
    {
      category: 'position',
      label: 'Business and local office',
      summary:
        '1980s-1990s: Small-business owner in Madison and local elected official in Dane County politics.',
    },
    {
      category: 'position',
      label: 'Dane County Board of Supervisors',
      summary: '1991-1996: Member of the Dane County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Assembly',
      summary: '1999-2013: Member of the Wisconsin State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Wisconsin's 2nd congressional district.",
    },
  ],
  'house-derrick-van-orden-wisconsin-3rd': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '1988-2014: Served in the U.S. Navy, including a long career in special operations before retiring as a senior chief.',
    },
    {
      category: 'position',
      label: 'Business and post-military work',
      summary: '2014-2022: Worked in business and other post-military roles after retiring from the Navy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Wisconsin's 3rd congressional district.",
    },
  ],
  'house-gwen-moore-wisconsin-4th': [
    {
      category: 'position',
      label: 'Community and anti-poverty work',
      summary:
        '1970s-1980s: Community leader and VISTA volunteer who helped launch a Milwaukee community credit union.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Assembly',
      summary: '1989-1992: Member of the Wisconsin State Assembly.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Senate',
      summary: '1993-2004: Member of the Wisconsin State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Wisconsin's 4th congressional district.",
    },
  ],
  'house-scott-fitzgerald-wisconsin-5th': [
    {
      category: 'position',
      label: 'United States Army Reserve',
      summary: '1981-2009: Served in the U.S. Army Reserve, retiring after a long career as a lieutenant colonel.',
    },
    {
      category: 'position',
      label: 'Newspaper publishing',
      summary: '1990s: Owned and helped run a local newspaper in Dodge County.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Senate',
      summary:
        '1995-2020: Member of the Wisconsin State Senate, including long service in Republican leadership and as majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Wisconsin's 5th congressional district.",
    },
  ],
  'house-glenn-grothman-wisconsin-6th': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1980s-1990s: Lawyer in private practice in Wisconsin.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Assembly',
      summary: '1993-2004: Member of the Wisconsin State Assembly.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Senate',
      summary: '2004-2014: Member of the Wisconsin State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Wisconsin's 6th congressional district.",
    },
  ],
  'house-thomas-tiffany-wisconsin-7th': [
    {
      category: 'position',
      label: 'Business and local government',
      summary: '1980s-2010s: Business owner in northern Wisconsin and later a member of a local town board.',
    },
    {
      category: 'position',
      label: 'Town of Little Rice board',
      summary: '2009-2013: Member of the Town of Little Rice board of supervisors.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Assembly',
      summary: '2011-2013: Member of the Wisconsin State Assembly.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Senate',
      summary: '2013-2020: Member of the Wisconsin State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2020-present: U.S. representative for Wisconsin's 7th congressional district.",
    },
  ],
  'house-tony-wied-wisconsin-8th': [
    {
      category: 'position',
      label: 'Small business owner',
      summary:
        '1998-2022: Built and operated convenience-store and restaurant businesses in northeast Wisconsin.',
    },
    {
      category: 'position',
      label: 'Civic and business leadership',
      summary: '2022-2024: Shifted from private business into a public-facing leadership role and congressional campaign.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2024-present: U.S. representative for Wisconsin's 8th congressional district.",
    },
  ],
  'house-mike-flood-nebraska-1st': [
    {
      category: 'position',
      label: 'Media and law',
      summary:
        '1990s-2020s: Lawyer, broadcaster, and entrepreneur who founded and expanded Flood Communications in Nebraska.',
    },
    {
      category: 'position',
      label: 'Nebraska Legislature',
      summary: '2005-2013: Member of the Nebraska Legislature, including service as speaker from 2007 to 2013.',
    },
    {
      category: 'position',
      label: 'Nebraska Legislature return',
      summary: '2021-2022: Returned to the Nebraska Legislature before resigning to run for Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2022-present: U.S. representative for Nebraska's 1st congressional district.",
    },
  ],
  'house-don-bacon-nebraska-2nd': [
    {
      category: 'position',
      label: 'United States Air Force',
      summary:
        '1985-2014: Served in the U.S. Air Force, culminating a nearly 30-year career as a brigadier general.',
    },
    {
      category: 'position',
      label: 'Congressional and academic work',
      summary:
        '2014-2017: Worked as a congressional military advisor and university instructor in the Omaha area.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Nebraska's 2nd congressional district.",
    },
  ],
  'house-adrian-smith-nebraska-3rd': [
    {
      category: 'position',
      label: 'Business and education work',
      summary: '1990s: Worked as an educator, business owner, and real-estate professional in western Nebraska.',
    },
    {
      category: 'position',
      label: 'Gering City Council',
      summary: '1994-1998: Member of the Gering City Council.',
    },
    {
      category: 'position',
      label: 'Nebraska Legislature',
      summary: '1999-2007: Member of the Nebraska Legislature.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Nebraska's 3rd congressional district.",
    },
  ],
  'house-john-larson-connecticut-1st': [
    {
      category: 'position',
      label: 'Teaching, insurance, and local politics',
      summary:
        '1970s-1982: Taught history, coached football, ran an insurance agency, and served in local East Hartford politics.',
    },
    {
      category: 'position',
      label: 'Connecticut State Senate',
      summary: '1983-1995: Member of the Connecticut State Senate.',
    },
    {
      category: 'position',
      label: 'President pro tempore',
      summary: '1987-1995: President pro tempore of the Connecticut State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1999-present: U.S. representative for Connecticut's 1st congressional district.",
    },
  ],
  'house-joe-courtney-connecticut-2nd': [
    {
      category: 'position',
      label: 'Law and local civic work',
      summary: '1970s-2006: Worked as a lawyer and local civic figure in eastern Connecticut before Congress.',
    },
    {
      category: 'position',
      label: 'Connecticut House of Representatives',
      summary: '1987-1994: Member of the Connecticut House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Connecticut's 2nd congressional district.",
    },
  ],
  'house-rosa-delauro-connecticut-3rd': [
    {
      category: 'position',
      label: 'Congressional and Democratic politics',
      summary:
        '1970s-1990: Worked in congressional and Democratic political roles, including senior jobs for Senator Chris Dodd and Governor Mario Cuomo.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1991-present: U.S. representative for Connecticut's 3rd congressional district.",
    },
  ],
  'house-james-himes-connecticut-4th': [
    {
      category: 'position',
      label: 'Finance and nonprofit work',
      summary:
        '1990s-2008: Worked at Goldman Sachs and later at Enterprise Community Partners while serving in local civic roles in Connecticut.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for Connecticut's 4th congressional district.",
    },
  ],
  'house-jahana-hayes-connecticut-5th': [
    {
      category: 'position',
      label: 'Education career',
      summary:
        '1990s-2018: Worked as a teacher, guidance counselor, and administrator in Waterbury Public Schools.',
    },
    {
      category: 'position',
      label: 'National teacher leadership',
      summary: '2016-2018: National Teacher of the Year and a prominent education advocate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Connecticut's 5th congressional district.",
    },
  ],
  'house-gabe-amo-rhode-island-1st': [
    {
      category: 'position',
      label: 'Federal and state executive service',
      summary:
        '2010s-2023: Worked in the Obama and Biden White Houses and in Rhode Island state government, including service for Governor Gina Raimondo.',
    },
    {
      category: 'position',
      label: 'White House intergovernmental affairs',
      summary: '2021-2023: Deputy director of intergovernmental affairs in the Biden White House.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Rhode Island's 1st congressional district.",
    },
  ],
  'house-seth-magaziner-rhode-island-2nd': [
    {
      category: 'position',
      label: 'Education and policy work',
      summary: '2010s: Worked as a public-school teacher and in economic and education policy roles.',
    },
    {
      category: 'position',
      label: 'Rhode Island general treasurer',
      summary: '2015-2023: Rhode Island general treasurer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Rhode Island's 2nd congressional district.",
    },
  ],
  'house-eric-crawford-arkansas-1st': [
    {
      category: 'position',
      label: 'United States Army',
      summary:
        '1980s: Served in the U.S. Army as an explosive ordnance disposal technician before college.',
    },
    {
      category: 'position',
      label: 'Agriculture, broadcasting, and media work',
      summary:
        '1990s-2010: Worked in agriculture and broadcasting, including rodeo announcing, farm reporting, and media production in Arkansas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Arkansas's 1st congressional district.",
    },
  ],
  'house-j-hill-arkansas-2nd': [
    {
      category: 'position',
      label: 'Senate and banking staff',
      summary:
        '1982-1984: Worked on Capitol Hill for Senator John Tower and on the Senate Banking Committee staff.',
    },
    {
      category: 'position',
      label: 'Treasury and White House economic policy',
      summary:
        '1989-1993: Served in the George H. W. Bush administration at Treasury and later as executive secretary of the White House Economic Policy Council.',
    },
    {
      category: 'position',
      label: 'Banking and finance leadership',
      summary:
        '1990s-2014: Built a career in investment and banking, including as founder and chief executive of Delta Trust & Banking Corporation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Arkansas's 2nd congressional district.",
    },
  ],
  'house-steve-womack-arkansas-3rd': [
    {
      category: 'position',
      label: 'Broadcasting and Army National Guard service',
      summary:
        '1980s-2009: Worked in radio broadcasting while serving in the Arkansas Army National Guard, retiring as a colonel.',
    },
    {
      category: 'position',
      label: 'Rogers City Council',
      summary: '1983-1984 and 1997-1998: Member of the Rogers City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Rogers',
      summary: '1999-2010: Mayor of Rogers, Arkansas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Arkansas's 3rd congressional district.",
    },
  ],
  'house-bruce-westerman-arkansas-4th': [
    {
      category: 'position',
      label: 'Engineering and forestry',
      summary:
        '1990s-2010: Worked as an engineer, forester, and small-business owner in Arkansas.',
    },
    {
      category: 'position',
      label: 'Arkansas House of Representatives',
      summary:
        '2011-2015: Member of the Arkansas House of Representatives, including service as speaker from 2013 to 2015.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Arkansas's 4th congressional district.",
    },
  ],
  'house-melanie-stansbury-new-mexico-1st': [
    {
      category: 'position',
      label: 'STEM, research, and public-policy work',
      summary:
        '2000s-2018: Worked as a STEM educator, researcher, and policy specialist focused on land, water, and natural-resource issues.',
    },
    {
      category: 'position',
      label: 'Federal energy and budget policy roles',
      summary:
        '2010s: Served on the Senate Energy and Natural Resources Committee staff and in the White House Office of Management and Budget.',
    },
    {
      category: 'position',
      label: 'New Mexico House of Representatives',
      summary: '2019-2021: Member of the New Mexico House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for New Mexico's 1st congressional district.",
    },
  ],
  'house-gabe-vasquez-new-mexico-2nd': [
    {
      category: 'position',
      label: 'Business, advocacy, and public-lands work',
      summary:
        '2010s: Worked in startup business, public-lands conservation, chamber-of-commerce leadership, and child-and-family policy advocacy.',
    },
    {
      category: 'position',
      label: 'Senate constituent and regional work',
      summary:
        '2013-2017: Worked for Senator Martin Heinrich on constituent and regional issues across southern New Mexico.',
    },
    {
      category: 'position',
      label: 'Las Cruces City Council',
      summary: '2017-2021: Member of the Las Cruces City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New Mexico's 2nd congressional district.",
    },
  ],
  'house-teresa-leger-fernandez-new-mexico-3rd': [
    {
      category: 'position',
      label: 'Public-interest law and community advocacy',
      summary:
        '1980s-2020: Attorney and advocate focused on voting rights, tribal sovereignty, environmental protection, acequia water rights, and rural community development.',
    },
    {
      category: 'position',
      label: 'Federal advisory and presidential appointments',
      summary:
        '1990s-2010s: Served in federal advisory and presidentially appointed roles, including as a White House fellow and vice chair of the Advisory Council on Historic Preservation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for New Mexico's 3rd congressional district.",
    },
  ],
  'house-kevin-hern-oklahoma-1st': [
    {
      category: 'position',
      label: 'Engineering and aerospace work',
      summary:
        '1980s: Worked as an aerospace engineer after earning an engineering degree.',
    },
    {
      category: 'position',
      label: 'McDonald’s franchise and business leadership',
      summary:
        '1990s-2018: Built a large McDonald’s franchise business and became a prominent business leader in Oklahoma.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2018-present: U.S. representative for Oklahoma's 1st congressional district.",
    },
  ],
  'house-josh-brecheen-oklahoma-2nd': [
    {
      category: 'position',
      label: 'Ranching, small business, and public speaking',
      summary:
        '1990s-2010: Worked in ranching, excavation and trucking, and motivational speaking in Oklahoma.',
    },
    {
      category: 'position',
      label: 'Senator Tom Coburn staff',
      summary: '2004-2010: Worked for U.S. Senator Tom Coburn.',
    },
    {
      category: 'position',
      label: 'Oklahoma State Senate',
      summary: '2010-2018: Member of the Oklahoma State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Oklahoma's 2nd congressional district.",
    },
  ],
  'house-frank-lucas-oklahoma-3rd': [
    {
      category: 'position',
      label: 'Farming and agricultural economics',
      summary:
        '1980s: Worked in farming and ranching after studying agricultural economics at Oklahoma State University.',
    },
    {
      category: 'position',
      label: 'Oklahoma House of Representatives',
      summary: '1988-1994: Member of the Oklahoma House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1994-present: U.S. representative for Oklahoma's 3rd congressional district.",
    },
  ],
  'house-tom-cole-oklahoma-4th': [
    {
      category: 'position',
      label: 'Academic and political work',
      summary:
        '1970s-1988: Worked as a college professor, political consultant, and public-affairs figure in Oklahoma.',
    },
    {
      category: 'position',
      label: 'Oklahoma State Senate',
      summary: '1988-1991: Member of the Oklahoma State Senate.',
    },
    {
      category: 'position',
      label: 'Oklahoma Republican Party',
      summary: '1991-1993: Executive director of the Oklahoma Republican Party.',
    },
    {
      category: 'position',
      label: 'Oklahoma secretary of state',
      summary: '1995-1999: Oklahoma secretary of state.',
    },
    {
      category: 'position',
      label: 'Congressional chief of staff',
      summary: '1999-2001: Chief of staff to Representative J. C. Watts.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Oklahoma's 4th congressional district.",
    },
  ],
  'house-stephanie-bice-oklahoma-5th': [
    {
      category: 'position',
      label: 'Private-sector business leadership',
      summary:
        '1990s-2014: Worked in business development, sales, and financial oversight in the private sector, including at her family’s technology company.',
    },
    {
      category: 'position',
      label: 'Oklahoma State Senate',
      summary: '2014-2020: Member of the Oklahoma State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Oklahoma's 5th congressional district.",
    },
  ],
  'house-donald-davis-north-carolina-1st': [
    {
      category: 'position',
      label: 'United States Air Force',
      summary:
        '1994-2002: Served as an Air Force officer, including operational and military-support assignments.',
    },
    {
      category: 'position',
      label: 'Education and military instruction',
      summary:
        '2000s-2023: Worked as an educator and instructor in eastern North Carolina, including teaching military and leadership courses.',
    },
    {
      category: 'position',
      label: 'Mayor of Snow Hill',
      summary: '2001-2008: Mayor of Snow Hill, North Carolina.',
    },
    {
      category: 'position',
      label: 'North Carolina Senate',
      summary: '2009-2011 and 2013-2023: Member of the North Carolina Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for North Carolina's 1st congressional district.",
    },
  ],
  'house-deborah-ross-north-carolina-2nd': [
    {
      category: 'position',
      label: 'Law and civil-rights advocacy',
      summary:
        '1990s-2002: Lawyer and civil-rights advocate in North Carolina, including work with the ACLU.',
    },
    {
      category: 'position',
      label: 'North Carolina House of Representatives',
      summary: '2003-2013: Member of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'Legal and clean-energy policy work',
      summary:
        '2013-2020: Returned to law and public-policy work, including advocacy on clean energy and voting rights.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for North Carolina's 2nd congressional district.",
    },
  ],
  'house-gregory-murphy-north-carolina-3rd': [
    {
      category: 'position',
      label: 'Medicine and surgical practice',
      summary:
        '1990s-2015: Practiced urology and served in medical leadership roles in eastern North Carolina.',
    },
    {
      category: 'position',
      label: 'North Carolina House of Representatives',
      summary: '2015-2019: Member of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for North Carolina's 3rd congressional district.",
    },
  ],
  'house-valerie-foushee-north-carolina-4th': [
    {
      category: 'position',
      label: 'Local education and civic leadership',
      summary:
        '1990s-2004: Served in local education and civic roles in Chapel Hill-Carrboro, including time on the local school board.',
    },
    {
      category: 'position',
      label: 'Orange County Board of Commissioners',
      summary: '2004-2008: Member of the Orange County Board of Commissioners.',
    },
    {
      category: 'position',
      label: 'North Carolina House of Representatives',
      summary: '2009-2012: Member of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'North Carolina Senate',
      summary: '2013-2023: Member of the North Carolina Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for North Carolina's 4th congressional district.",
    },
  ],
  'house-virginia-foxx-north-carolina-5th': [
    {
      category: 'position',
      label: 'Teaching and higher-education administration',
      summary:
        '1970s-1994: Worked as a teacher and college administrator in North Carolina, including senior roles at Mayland Community College.',
    },
    {
      category: 'position',
      label: 'North Carolina Senate',
      summary: '1994-2004: Member of the North Carolina Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for North Carolina's 5th congressional district.",
    },
  ],
  'house-addison-mcdowell-north-carolina-6th': [
    {
      category: 'position',
      label: 'Congressional staff work',
      summary:
        '2010s-2024: Worked on congressional staffs, including for Ted Budd and Richard Hudson, helping constituents and district operations.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for North Carolina's 6th congressional district.",
    },
  ],
  'house-david-rouzer-north-carolina-7th': [
    {
      category: 'position',
      label: 'Agriculture and public-policy work',
      summary:
        '1990s-2008: Worked in agricultural, public-policy, and federal executive-branch roles, including staff work for Senators Jesse Helms and Elizabeth Dole and service at USDA Rural Development.',
    },
    {
      category: 'position',
      label: 'North Carolina Senate',
      summary: '2009-2012: Member of the North Carolina Senate.',
    },
    {
      category: 'position',
      label: 'Small-business consulting',
      summary: '2012-2014: Worked in consulting and business ventures before returning to elected office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for North Carolina's 7th congressional district.",
    },
  ],
  'house-mark-harris-north-carolina-8th': [
    {
      category: 'position',
      label: 'Pastoral ministry',
      summary:
        '1980s-2024: Baptist pastor and church leader in North Carolina, including more than a decade as senior pastor of First Baptist Church in Charlotte.',
    },
    {
      category: 'position',
      label: 'North Carolina Baptist Convention',
      summary: '2010s: Served as president of the North Carolina Baptist Convention.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for North Carolina's 8th congressional district.",
    },
  ],
  'house-richard-hudson-north-carolina-9th': [
    {
      category: 'position',
      label: 'Congressional and political staff work',
      summary:
        '1990s-2012: Worked in congressional staff, campaign, and political-advisory roles before running for office himself.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for North Carolina's 9th congressional district.",
    },
  ],
  'house-pat-harrigan-north-carolina-10th': [
    {
      category: 'position',
      label: 'United States Army',
      summary:
        '2010s: Served as an infantry officer and later as a Green Beret, including combat deployments to Afghanistan.',
    },
    {
      category: 'position',
      label: 'Entrepreneurship and manufacturing',
      summary:
        '2010s-2024: Built and led a firearms manufacturing business in North Carolina after military service.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for North Carolina's 10th congressional district.",
    },
  ],
  'house-chuck-edwards-north-carolina-11th': [
    {
      category: 'position',
      label: 'Business and civic leadership',
      summary:
        '1990s-2016: Business owner and civic leader in western North Carolina, especially in Hendersonville and the surrounding region.',
    },
    {
      category: 'position',
      label: 'North Carolina Senate',
      summary: '2016-2023: Member of the North Carolina Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for North Carolina's 11th congressional district.",
    },
  ],
  'house-alma-adams-north-carolina-12th': [
    {
      category: 'position',
      label: 'Teaching and college administration',
      summary:
        '1970s-2014: Worked as an educator and college administrator, including long service at Bennett College.',
    },
    {
      category: 'position',
      label: 'Greensboro Board of Education',
      summary: '1984-1986: Member of the Greensboro Board of Education.',
    },
    {
      category: 'position',
      label: 'Greensboro City Council',
      summary: '1987-1994: Member of the Greensboro City Council.',
    },
    {
      category: 'position',
      label: 'North Carolina House of Representatives',
      summary: '1994-2014: Member of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2014-present: U.S. representative for North Carolina's 12th congressional district.",
    },
  ],
  'house-brad-knott-north-carolina-13th': [
    {
      category: 'position',
      label: 'Federal prosecution and law-enforcement work',
      summary:
        '2010s-2024: Federal prosecutor who worked on organized crime, trafficking, drug, and financial-crime cases alongside law-enforcement agencies.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for North Carolina's 13th congressional district.",
    },
  ],
  'house-tim-moore-north-carolina-14th': [
    {
      category: 'position',
      label: 'Law practice and local leadership',
      summary:
        '1990s-2002: Practiced law and built a public profile in Cleveland County before entering state office.',
    },
    {
      category: 'position',
      label: 'North Carolina House of Representatives',
      summary: '2002-2025: Member of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'Speaker of the North Carolina House',
      summary: '2015-2025: Speaker of the North Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for North Carolina's 14th congressional district.",
    },
  ],
  'house-diana-harshbarger-tennessee-1st': [
    {
      category: 'position',
      label: 'Pharmacy and business ownership',
      summary:
        '1980s-2020: Pharmacist and longtime business owner in East Tennessee after earning her pharmacy degree.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Tennessee's 1st congressional district.",
    },
  ],
  'house-tim-burchett-tennessee-2nd': [
    {
      category: 'position',
      label: 'Small business ownership',
      summary: '1980s-1990s: Worked in small business before entering elected office.',
    },
    {
      category: 'position',
      label: 'Tennessee House and Senate',
      summary:
        '1990s-2010: Served four years in the Tennessee House and then twelve years in the Tennessee State Senate.',
    },
    {
      category: 'position',
      label: 'Mayor of Knox County',
      summary: '2010-2018: Mayor of Knox County, Tennessee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Tennessee's 2nd congressional district.",
    },
  ],
  'house-charles-fleischmann-tennessee-3rd': [
    {
      category: 'position',
      label: 'Law practice and small business',
      summary:
        '1980s-2010: Lawyer and small-business owner in Chattanooga after graduating from the University of Tennessee College of Law.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Tennessee's 3rd congressional district.",
    },
  ],
  'house-scott-desjarlais-tennessee-4th': [
    {
      category: 'position',
      label: 'Medicine and medical practice',
      summary: '1990s-2010: Physician who practiced medicine in Tennessee before entering Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Tennessee's 4th congressional district.",
    },
  ],
  'house-andrew-ogles-tennessee-5th': [
    {
      category: 'position',
      label: 'Entrepreneurship and nonprofit leadership',
      summary:
        '2000s-2018: Built careers in restaurant and real-estate businesses and later led anti-trafficking and economic-policy organizations.',
    },
    {
      category: 'position',
      label: 'Mayor of Maury County',
      summary: '2018-2022: Mayor of Maury County, Tennessee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Tennessee's 5th congressional district.",
    },
  ],
  'house-john-rose-tennessee-6th': [
    {
      category: 'position',
      label: 'Farming, law, and entrepreneurship',
      summary:
        '1990s-2018: Farmer, attorney, and entrepreneur, including leadership of Boson Software and continued work on his family farm.',
    },
    {
      category: 'position',
      label: 'Tennessee agriculture leadership',
      summary: 'Early 2000s: Served as Tennessee commissioner of agriculture.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Tennessee's 6th congressional district.",
    },
  ],
  'house-matt-van-epps-tennessee-7th': [
    {
      category: 'position',
      label: 'United States Army service',
      summary:
        '2000s-2010s: Army aviator and special-operations pilot with deployments to Iraq and Afghanistan; later continued service in the Tennessee Army National Guard.',
    },
    {
      category: 'position',
      label: 'Tennessee state government and business leadership',
      summary:
        '2010s-2025: Held senior operational roles in Tennessee state government and leadership roles in private-sector recruiting, health-care, and procurement work.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Tennessee's 7th congressional district.",
    },
  ],
  'house-david-kustoff-tennessee-8th': [
    {
      category: 'position',
      label: 'Law practice and Republican leadership',
      summary:
        '1992-2006: Practiced law in Memphis and served in party and campaign leadership roles in Tennessee.',
    },
    {
      category: 'position',
      label: 'United States attorney',
      summary: '2006-2008: U.S. attorney for the Western District of Tennessee.',
    },
    {
      category: 'position',
      label: 'Banking and higher-education oversight',
      summary:
        '2010-2016: Served on the board of BankTennessee and on the Tennessee Higher Education Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Tennessee's 8th congressional district.",
    },
  ],
  'house-steve-cohen-tennessee-9th': [
    {
      category: 'position',
      label: 'Law practice and community leadership',
      summary:
        '1970s-1982: Lawyer and public advocate in Memphis before moving into long-term state legislative service.',
    },
    {
      category: 'position',
      label: 'Tennessee State Senate',
      summary: '1983-2006: Member of the Tennessee State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Tennessee's 9th congressional district.",
    },
  ],
  'house-nathaniel-moran-texas-1st': [
    {
      category: 'position',
      label: 'Law and business work',
      summary:
        '1990s-2010s: Worked as an attorney and business owner in East Texas before moving into senior local office.',
    },
    {
      category: 'position',
      label: 'Tyler local government',
      summary: '2010s: Served on the Tyler City Council and later as mayor pro tem.',
    },
    {
      category: 'position',
      label: 'Smith County judge',
      summary: '2016-2023: Smith County judge in East Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 1st congressional district.",
    },
  ],
  'house-dan-crenshaw-texas-2nd': [
    {
      category: 'position',
      label: 'United States Navy SEALs',
      summary:
        '2006-2016: Navy SEAL officer with multiple deployments to Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Veterans advocacy and policy work',
      summary:
        '2016-2018: Worked in veterans-focused nonprofit, public-policy, and business roles after military retirement.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 2nd congressional district.",
    },
  ],
  'house-keith-self-texas-3rd': [
    {
      category: 'position',
      label: 'United States Army',
      summary:
        '1970s-2001: Served in the U.S. Army, including airborne infantry and Special Forces assignments, retiring as a lieutenant colonel.',
    },
    {
      category: 'position',
      label: 'Collin County judge',
      summary: '2007-2018: County judge of Collin County, Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 3rd congressional district.",
    },
  ],
  'house-pat-fallon-texas-4th': [
    {
      category: 'position',
      label: 'Air Force service and business leadership',
      summary:
        '1990s-2012: Served as an Air Force officer and later built a career as an entrepreneur and business founder.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2013-2019: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'Texas State Senate',
      summary: '2019-2021: Member of the Texas State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 4th congressional district.",
    },
  ],
  'house-lance-gooden-texas-5th': [
    {
      category: 'position',
      label: 'Insurance and business work',
      summary:
        '2000s-2016: Worked in the insurance industry and other business roles in Texas before state office.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2017-2019: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 5th congressional district.",
    },
  ],
  'house-jake-ellzey-texas-6th': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '1990s-2012: Naval aviator and fighter pilot with multiple deployments and combat tours.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2021: Briefly served in the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 6th congressional district.",
    },
  ],
  'house-lizzie-fletcher-texas-7th': [
    {
      category: 'position',
      label: 'Business, nonprofit, and legal work',
      summary:
        '1990s-2018: Worked in business and nonprofit roles before becoming a litigation lawyer and law-firm partner in Houston.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 7th congressional district.",
    },
  ],
  'house-morgan-luttrell-texas-8th': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '2000s-2014: Navy SEAL who later recovered from severe injuries sustained in a helicopter crash.',
    },
    {
      category: 'position',
      label: 'Veteran wellness and recovery work',
      summary:
        '2014-2022: Worked on health, wellness, and recovery programs for veterans and others dealing with traumatic brain injury and PTSD.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 8th congressional district.",
    },
  ],
  'house-al-green-texas-9th': [
    {
      category: 'position',
      label: 'Law and civil-rights advocacy',
      summary:
        '1970s-2004: Attorney and civil-rights advocate in Houston, alongside long service in local judicial office.',
    },
    {
      category: 'position',
      label: 'Justice of the peace',
      summary: '1977-2004: Justice of the peace in Harris County, Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Texas's 9th congressional district.",
    },
  ],
  'house-michael-mccaul-texas-10th': [
    {
      category: 'position',
      label: 'Federal prosecution and public-integrity work',
      summary:
        '1990s: Federal prosecutor in Washington and later in Texas, including service in the Justice Department’s Public Integrity Section.',
    },
    {
      category: 'position',
      label: 'Texas and federal national-security roles',
      summary:
        'Late 1990s-2004: Served as Texas deputy attorney general under John Cornyn and later as chief of counterterrorism and national security in the U.S. attorney’s office in Austin.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Texas's 10th congressional district.",
    },
  ],
  'house-august-pfluger-texas-11th': [
    {
      category: 'position',
      label: 'United States Air Force',
      summary:
        '2000s-2019: Air Force fighter pilot and commander with combat and strategic national-security assignments.',
    },
    {
      category: 'position',
      label: 'National Security Council',
      summary: '2019-2020: Advisor on the National Security Council during the first Trump administration.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 11th congressional district.",
    },
  ],
  'house-craig-goldman-texas-12th': [
    {
      category: 'position',
      label: 'Family business and local public service',
      summary:
        '2000s-2013: Worked in his family’s Fort Worth retail business and built a local public-service profile.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2013-2025: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Texas's 12th congressional district.",
    },
  ],
  'house-ronny-jackson-texas-13th': [
    {
      category: 'position',
      label: 'United States Navy medicine',
      summary:
        '1990s-2019: Navy physician and emergency-medicine officer, including battlefield and senior White House medical service.',
    },
    {
      category: 'position',
      label: 'White House Medical Unit',
      summary:
        '2000s-2019: Served in the White House Medical Unit, including as physician to the president and later chief medical advisor to the president.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 13th congressional district.",
    },
  ],
  'house-randy-weber-texas-14th': [
    {
      category: 'position',
      label: 'Business and local government',
      summary:
        '1970s-2008: Small-business owner and public official on the Gulf Coast before the state legislature.',
    },
    {
      category: 'position',
      label: 'Pearland City Council',
      summary: '1990-1996: Member of the Pearland City Council.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2009-2013: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Texas's 14th congressional district.",
    },
  ],
  'house-monica-de-la-cruz-texas-15th': [
    {
      category: 'position',
      label: 'Business and insurance leadership',
      summary:
        '1990s-2022: Worked in business and insurance roles in South Texas before winning federal office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 15th congressional district.",
    },
  ],
  'house-veronica-escobar-texas-16th': [
    {
      category: 'position',
      label: 'Community and border-region leadership',
      summary:
        '1990s-2006: Worked in nonprofit, civic, and public-policy roles in El Paso before county office.',
    },
    {
      category: 'position',
      label: 'El Paso County Commissioners Court',
      summary: '2007-2011: Member of the El Paso County Commissioners Court.',
    },
    {
      category: 'position',
      label: 'El Paso County judge',
      summary: '2011-2017: El Paso County judge.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 16th congressional district.",
    },
  ],
  'house-pete-sessions-texas-17th': [
    {
      category: 'position',
      label: 'Southwestern Bell',
      summary: '1978-1994: Worked in management at Southwestern Bell before entering politics.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-2019: U.S. representative in his first long House stint for a North Texas district.",
    },
    {
      category: 'position',
      label: 'Public-policy work outside Congress',
      summary:
        '2019-2023: Worked in public-policy and advocacy roles before returning to Congress from Central Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 17th congressional district.",
    },
  ],
  'house-christian-menefee-texas-18th': [
    {
      category: 'position',
      label: 'Law-firm litigation and investigations',
      summary:
        '2010s-2020: Lawyer in Houston focusing on business litigation and corporate investigations.',
    },
    {
      category: 'position',
      label: 'Harris County attorney',
      summary:
        '2021-2026: Harris County attorney, serving as the top civil lawyer for Texas’s largest county.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2026-present: U.S. representative for Texas's 18th congressional district.",
    },
  ],
  'house-jodey-arrington-texas-19th': [
    {
      category: 'position',
      label: 'Bush administration and FDIC roles',
      summary:
        '1990s-2007: Worked for Governor George W. Bush, served in the White House, and later became chief of staff at the FDIC.',
    },
    {
      category: 'position',
      label: 'Texas Tech and health-care leadership',
      summary:
        '2007-2016: Vice chancellor of the Texas Tech University System and later president of a health-care innovation company in Lubbock.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Texas's 19th congressional district.",
    },
  ],
  'house-joaquin-castro-texas-20th': [
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2003-2013: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Texas's 20th congressional district.",
    },
  ],
  'house-chip-roy-texas-21st': [
    {
      category: 'position',
      label: 'Law, finance, and federal policy work',
      summary:
        '2000s-2018: Worked in investment banking, as a federal prosecutor, and in senior legal and policy roles for Texas and federal Republicans.',
    },
    {
      category: 'position',
      label: 'Texas and Senate leadership roles',
      summary:
        '2010s: Served as Senate Judiciary staff director for John Cornyn, senior adviser to Rick Perry, chief of staff to Ted Cruz, and first assistant attorney general of Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 21st congressional district.",
    },
  ],
  'house-troy-nehls-texas-22nd': [
    {
      category: 'position',
      label: 'Army Reserve and law enforcement',
      summary:
        '1990s-2020: Served in the Army Reserve and built a long law-enforcement career in Fort Bend County.',
    },
    {
      category: 'position',
      label: 'Fort Bend constable',
      summary: '2005-2013: Constable in Fort Bend County, Texas.',
    },
    {
      category: 'position',
      label: 'Fort Bend County sheriff',
      summary: '2013-2021: Sheriff of Fort Bend County, Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 22nd congressional district.",
    },
  ],
  'house-tony-gonzales-texas-23rd': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '1990s-2020: Served in the Navy, rising to the rank of master chief petty officer after two decades of service.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 23rd congressional district.",
    },
  ],
  'house-beth-van-duyne-texas-24th': [
    {
      category: 'position',
      label: 'Private-sector business work',
      summary:
        '1990s-2011: Worked in business, sales, and technology-related roles before entering city leadership.',
    },
    {
      category: 'position',
      label: 'Mayor of Irving',
      summary: '2011-2017: Mayor of Irving, Texas.',
    },
    {
      category: 'position',
      label: 'HUD regional administrator',
      summary: '2019-2020: Regional administrator at the U.S. Department of Housing and Urban Development.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Texas's 24th congressional district.",
    },
  ],
  'house-roger-williams-texas-25th': [
    {
      category: 'position',
      label: 'Automobile business leadership',
      summary:
        '1970s-2005: Built a long career in the automobile business and became a prominent Texas dealership owner.',
    },
    {
      category: 'position',
      label: 'Texas secretary of state',
      summary: '2005-2007: Texas secretary of state.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Texas's 25th congressional district.",
    },
  ],
  'house-brandon-gill-texas-26th': [
    {
      category: 'position',
      label: 'Finance and conservative media',
      summary:
        '2010s-2024: Worked in investment banking and hedge-fund finance before launching a conservative digital media outlet.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Texas's 26th congressional district.",
    },
  ],
  'house-michael-cloud-texas-27th': [
    {
      category: 'position',
      label: 'Small business and grassroots activism',
      summary:
        '2000s-2018: Small-business owner and grassroots conservative activist in South Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2018-present: U.S. representative for Texas's 27th congressional district.",
    },
  ],
  'house-henry-cuellar-texas-28th': [
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '1987-2001: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'Texas secretary of state',
      summary: '2001: Texas secretary of state.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Texas's 28th congressional district.",
    },
  ],
  'house-sylvia-garcia-texas-29th': [
    {
      category: 'position',
      label: 'Law, social work, and local public service',
      summary:
        '1980s-1998: Worked in social work, legal aid, and local public roles in Houston before citywide office.',
    },
    {
      category: 'position',
      label: 'Houston city controller',
      summary: '1998-2003: Houston city controller.',
    },
    {
      category: 'position',
      label: 'Harris County commissioner',
      summary: '2003-2010: Harris County commissioner.',
    },
    {
      category: 'position',
      label: 'Texas State Senate',
      summary: '2013-2019: Member of the Texas State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Texas's 29th congressional district.",
    },
  ],
  'house-jasmine-crockett-texas-30th': [
    {
      category: 'position',
      label: 'Public defense and civil-rights law',
      summary:
        '2010s-2020: Worked as a public defender and civil-rights attorney in Texas.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2021-2023: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 30th congressional district.",
    },
  ],
  'house-john-carter-texas-31st': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1970s-1981: Lawyer in Central Texas before moving onto the bench.',
    },
    {
      category: 'position',
      label: 'State district judge',
      summary: '1981-2001: State district judge in Williamson County, Texas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Texas's 31st congressional district.",
    },
  ],
  'house-julie-johnson-texas-32nd': [
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '1990s-2018: Lawyer in private practice focused on consumer, insurance, and civil matters.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2019-2025: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Texas's 32nd congressional district.",
    },
  ],
  'house-marc-veasey-texas-33rd': [
    {
      category: 'position',
      label: 'Congressional staff work',
      summary: '1990s-2004: Worked as a congressional staffer in North Texas for Representative Martin Frost.',
    },
    {
      category: 'position',
      label: 'Texas House of Representatives',
      summary: '2005-2013: Member of the Texas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Texas's 33rd congressional district.",
    },
  ],
  'house-vicente-gonzalez-texas-34th': [
    {
      category: 'position',
      label: 'Law practice and business',
      summary:
        '1997-2016: Built a law practice and business career in South Texas before running for Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Texas's 34th congressional district.",
    },
  ],
  'house-greg-casar-texas-35th': [
    {
      category: 'position',
      label: 'Labor and immigrant-rights organizing',
      summary:
        '2010s: Labor organizer and advocate on housing, workers’ rights, and immigrant issues in Austin.',
    },
    {
      category: 'position',
      label: 'Austin City Council',
      summary: '2015-2023: Member of the Austin City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 35th congressional district.",
    },
  ],
  'house-brian-babin-texas-36th': [
    {
      category: 'position',
      label: 'Military and dentistry',
      summary:
        '1970s-2014: Served in the Air Force and then practiced dentistry for decades in East Texas.',
    },
    {
      category: 'position',
      label: 'Local government and civic roles',
      summary:
        '1980s-2014: Held local leadership roles including city council member, mayor, and school-board member in the Woodville area.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Texas's 36th congressional district.",
    },
  ],
  'house-lloyd-doggett-texas-37th': [
    {
      category: 'position',
      label: 'Texas State Senate',
      summary: '1973-1985: Member of the Texas State Senate.',
    },
    {
      category: 'position',
      label: 'Texas Supreme Court',
      summary: '1989-1995: Justice of the Texas Supreme Court.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1995-present: U.S. representative for a succession of Central Texas districts, now Texas's 37th.",
    },
  ],
  'house-wesley-hunt-texas-38th': [
    {
      category: 'position',
      label: 'United States Army',
      summary:
        '2004-2012: Army officer and Apache helicopter pilot with combat and diplomatic service assignments.',
    },
    {
      category: 'position',
      label: 'Business and graduate study',
      summary:
        '2010s-2022: Completed graduate study and worked in business, consulting, and private-sector leadership roles.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Texas's 38th congressional district.",
    },
  ],
  'house-donald-norcross-new-jersey-1st': [
    {
      category: 'position',
      label: 'Electrical work and labor leadership',
      summary:
        '1970s-2009: Worked as an electrician and labor leader in southern New Jersey before elected office.',
    },
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '2010: Member of the New Jersey General Assembly.',
    },
    {
      category: 'position',
      label: 'New Jersey State Senate',
      summary: '2010-2014: Member of the New Jersey State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2014-present: U.S. representative for New Jersey's 1st congressional district.",
    },
  ],
  'house-jefferson-van-drew-new-jersey-2nd': [
    {
      category: 'position',
      label: 'Dentistry and local government',
      summary:
        '1980s-2001: Practiced dentistry and served in local government in South Jersey before the state legislature.',
    },
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '2002-2008: Member of the New Jersey General Assembly.',
    },
    {
      category: 'position',
      label: 'New Jersey State Senate',
      summary: '2008-2018: Member of the New Jersey State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for New Jersey's 2nd congressional district.",
    },
  ],
  'house-herbert-conaway-new-jersey-3rd': [
    {
      category: 'position',
      label: 'Air Force, medicine, and law',
      summary:
        '1980s-1998: Served in the U.S. Air Force and built careers in medicine and law before Congress.',
    },
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '1998-2025: Member of the New Jersey General Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New Jersey's 3rd congressional district.",
    },
  ],
  'house-christopher-smith-new-jersey-4th': [
    {
      category: 'position',
      label: 'Community activism',
      summary:
        '1970s-1980: Worked in local community and advocacy roles in New Jersey before winning federal office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1981-present: U.S. representative for New Jersey's 4th congressional district.",
    },
  ],
  'house-josh-gottheimer-new-jersey-5th': [
    {
      category: 'position',
      label: 'Policy, speechwriting, and business strategy',
      summary:
        '1990s-2016: Worked as a presidential speechwriter, federal policy aide, and business executive, including roles in the Clinton administration, the FCC, Microsoft, and Ford.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for New Jersey's 5th congressional district.",
    },
  ],
  'house-frank-pallone-new-jersey-6th': [
    {
      category: 'position',
      label: 'Law and local government',
      summary: '1970s-1982: Worked as a lawyer and local public official in Long Branch, New Jersey.',
    },
    {
      category: 'position',
      label: 'Long Branch City Council',
      summary: '1982-1988: Member of the Long Branch City Council.',
    },
    {
      category: 'position',
      label: 'New Jersey State Senate',
      summary: '1983-1988: Member of the New Jersey State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1988-present: U.S. representative for New Jersey's 6th congressional district.",
    },
  ],
  'house-thomas-kean-new-jersey-7th': [
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '2001-2003: Member of the New Jersey General Assembly.',
    },
    {
      category: 'position',
      label: 'New Jersey State Senate',
      summary: '2003-2022: Member of the New Jersey State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New Jersey's 7th congressional district.",
    },
  ],
  'house-robert-menendez-new-jersey-8th': [
    {
      category: 'position',
      label: 'Law and Hudson County public service',
      summary:
        '2010s-2022: Worked as an attorney and in public-service roles in Hudson County before Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New Jersey's 8th congressional district.",
    },
  ],
  'house-nellie-pou-new-jersey-9th': [
    {
      category: 'position',
      label: 'Human services and county government',
      summary:
        '1980s-1997: Worked in New Jersey human-services roles and served as a Passaic County freeholder director.',
    },
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '1997-2012: Member of the New Jersey General Assembly.',
    },
    {
      category: 'position',
      label: 'New Jersey State Senate',
      summary: '2012-2025: Member of the New Jersey State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New Jersey's 9th congressional district.",
    },
  ],
  'house-lamonica-mciver-new-jersey-10th': [
    {
      category: 'position',
      label: 'Newark local government',
      summary:
        '2010s-2022: Worked in Newark civic and local-government roles before rising in city leadership.',
    },
    {
      category: 'position',
      label: 'Newark Municipal Council',
      summary: '2018-2022: Member of the Newark Municipal Council.',
    },
    {
      category: 'position',
      label: 'Council president',
      summary: '2022-2024: President of the Newark Municipal Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2024-present: U.S. representative for New Jersey's 10th congressional district.",
    },
  ],
  'house-bonnie-watson-coleman-new-jersey-12th': [
    {
      category: 'position',
      label: 'State government and community affairs',
      summary:
        '1970s-1997: Worked in New Jersey public-service and community-affairs roles before elected office.',
    },
    {
      category: 'position',
      label: 'New Jersey General Assembly',
      summary: '1998-2014: Member of the New Jersey General Assembly and later majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for New Jersey's 12th congressional district.",
    },
  ],
  'house-frank-mrvan-indiana-1st': [
    {
      category: 'position',
      label: 'North Township public service',
      summary:
        '2000s-2020: Worked in local public service in northwest Indiana, including 15 years as North Township trustee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Indiana's 1st congressional district.",
    },
  ],
  'house-rudy-yakym-indiana-2nd': [
    {
      category: 'position',
      label: 'Business and economic development',
      summary:
        '2010s-2022: Worked in the private sector, most recently leading growth initiatives at Kem Krest in northern Indiana.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2022-present: U.S. representative for Indiana's 2nd congressional district.",
    },
  ],
  'house-marlin-stutzman-indiana-3rd': [
    {
      category: 'position',
      label: 'Farming and family business',
      summary:
        '1990s-2000s: Built a career in farming, agribusiness, and family business in northern Indiana.',
    },
    {
      category: 'position',
      label: 'Indiana House and Senate',
      summary: '2000s-2010: Served in the Indiana House and then the Indiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2010-2017: Served his first stint in the U.S. House.',
    },
    {
      category: 'position',
      label: 'Business ventures outside Congress',
      summary:
        '2017-2025: Worked in manufacturing, agriculture, food-service, and other entrepreneurial ventures back in Indiana.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: Returned to Congress as U.S. representative for Indiana's 3rd congressional district.",
    },
  ],
  'house-james-baird-indiana-4th': [
    {
      category: 'position',
      label: 'Army service and agriculture',
      summary:
        '1970s-2000s: Vietnam veteran, Purdue-trained animal scientist, and longtime farmer in west central Indiana.',
    },
    {
      category: 'position',
      label: 'County commissioner',
      summary: '2000s: Served in local government as a county commissioner.',
    },
    {
      category: 'position',
      label: 'Indiana House of Representatives',
      summary: '2010-2018: Member of the Indiana House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Indiana's 4th congressional district.",
    },
  ],
  'house-victoria-spartz-indiana-5th': [
    {
      category: 'position',
      label: 'Accounting, finance, and business',
      summary:
        '2000s-2017: Worked as a CPA, finance executive, university instructor, and business owner after immigrating from Ukraine.',
    },
    {
      category: 'position',
      label: 'Indiana State Senate',
      summary: '2017-2020: Member of the Indiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Indiana's 5th congressional district.",
    },
  ],
  'house-jefferson-shreve-indiana-6th': [
    {
      category: 'position',
      label: 'Business and investing',
      summary:
        '1980s-2025: Built businesses in self-storage, software, and energy investing, including founding Storage Express.',
    },
    {
      category: 'position',
      label: 'Indianapolis City-County Council',
      summary: '2013-2016 and 2018-2020: Member of the Indianapolis City-County Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Indiana's 6th congressional district.",
    },
  ],
  'house-andre-carson-indiana-7th': [
    {
      category: 'position',
      label: 'Law enforcement and homeland security work',
      summary:
        '2000s: Worked in law enforcement and in Indiana homeland-security and intelligence roles before Congress.',
    },
    {
      category: 'position',
      label: 'Indianapolis City-County Council',
      summary: '2007-2008: Member of the Indianapolis City-County Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2008-present: U.S. representative for Indiana's 7th congressional district.",
    },
  ],
  'house-mark-messmer-indiana-8th': [
    {
      category: 'position',
      label: 'Small business and community leadership',
      summary:
        '1980s-2008: Worked as a small-business owner and local community leader in southern Indiana.',
    },
    {
      category: 'position',
      label: 'Indiana House of Representatives',
      summary: '2008-2014: Member of the Indiana House of Representatives.',
    },
    {
      category: 'position',
      label: 'Indiana State Senate',
      summary: '2018-2024: Member of the Indiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Indiana's 8th congressional district.",
    },
  ],
  'house-erin-houchin-indiana-9th': [
    {
      category: 'position',
      label: 'Regional political and communications work',
      summary:
        '2010s: Worked as regional director for Senator Dan Coats, ran a communications firm, and held community leadership roles in southern Indiana.',
    },
    {
      category: 'position',
      label: 'Indiana State Senate',
      summary: '2014-2022: Member of the Indiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Indiana's 9th congressional district.",
    },
  ],
  'house-james-comer-kentucky-1st': [
    {
      category: 'position',
      label: 'Agriculture and farming',
      summary:
        '1990s-2000: Studied agriculture at Western Kentucky University and built his farm business in Monroe County.',
    },
    {
      category: 'position',
      label: 'Kentucky House of Representatives',
      summary: '2001-2012: Member of the Kentucky House of Representatives.',
    },
    {
      category: 'position',
      label: 'Kentucky commissioner of agriculture',
      summary: '2012-2016: Kentucky commissioner of agriculture.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Kentucky's 1st congressional district.",
    },
  ],
  'house-brett-guthrie-kentucky-2nd': [
    {
      category: 'position',
      label: 'Army and manufacturing business',
      summary:
        '1980s-1998: Served in the Army and later joined his family\'s manufacturing business in Bowling Green.',
    },
    {
      category: 'position',
      label: 'Kentucky State Senate',
      summary: '1999-2008: Member of the Kentucky State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for Kentucky's 2nd congressional district.",
    },
  ],
  'house-morgan-mcgarvey-kentucky-3rd': [
    {
      category: 'position',
      label: 'Law and Louisville civic work',
      summary:
        '2000s-2012: Built a legal career in Louisville and became active in local civic and Democratic politics.',
    },
    {
      category: 'position',
      label: 'Kentucky State Senate',
      summary: '2013-2023: Member of the Kentucky State Senate, including four years as minority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Kentucky's 3rd congressional district.",
    },
  ],
  'house-thomas-massie-kentucky-4th': [
    {
      category: 'position',
      label: 'Engineering and entrepreneurship',
      summary:
        '1990s-2010: MIT-trained engineer who founded SensAble Technologies and later returned to Kentucky business life.',
    },
    {
      category: 'position',
      label: 'Lewis County judge/executive',
      summary: '2011-2012: Lewis County judge/executive.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2012-present: U.S. representative for Kentucky's 4th congressional district.",
    },
  ],
  'house-harold-rogers-kentucky-5th': [
    {
      category: 'position',
      label: 'Law and prosecution',
      summary:
        '1960s-1980: Worked as a lawyer and prosecutor in eastern Kentucky before winning federal office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1981-present: U.S. representative for Kentucky's 5th congressional district.",
    },
  ],
  'house-andy-barr-kentucky-6th': [
    {
      category: 'position',
      label: 'Law and public-policy work',
      summary:
        '2000s-2010: Worked in legal and public-policy roles in Kentucky and Washington before elective office.',
    },
    {
      category: 'position',
      label: 'Lexington urban county council',
      summary: '2010-2012: Member of the Lexington-Fayette Urban County Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Kentucky's 6th congressional district.",
    },
  ],
  'house-earl-carter-georgia-1st': [
    {
      category: 'position',
      label: 'Pharmacy and small business',
      summary:
        '1980s-1994: Built his career as a pharmacist and local small-business owner in coastal Georgia.',
    },
    {
      category: 'position',
      label: 'Pooler city government',
      summary: '1994-2004: Served on the Pooler city council and later as mayor.',
    },
    {
      category: 'position',
      label: 'Georgia General Assembly',
      summary: '2005-2014: Served in the Georgia House and then the Georgia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Georgia's 1st congressional district.",
    },
  ],
  'house-sanford-bishop-georgia-2nd': [
    {
      category: 'position',
      label: 'Georgia House of Representatives',
      summary: '1977-1990: Member of the Georgia House of Representatives.',
    },
    {
      category: 'position',
      label: 'Georgia State Senate',
      summary: '1991-1992: Member of the Georgia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for Georgia's 2nd congressional district.",
    },
  ],
  'house-brian-jack-georgia-3rd': [
    {
      category: 'position',
      label: 'Republican political work',
      summary:
        '2010s-2019: Worked in Republican campaign, congressional, and political-operation roles before joining the White House.',
    },
    {
      category: 'position',
      label: 'White House political director',
      summary: '2019-2021: White House political director during the Trump administration.',
    },
    {
      category: 'position',
      label: 'Trump congressional liaison work',
      summary:
        '2021-2024: Worked as a principal liaison between congressional Republicans and Donald Trump after the first Trump administration.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Georgia's 3rd congressional district.",
    },
  ],
  'house-henry-johnson-georgia-4th': [
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '1970s-1989: Practiced law in Decatur, Georgia, focusing on criminal defense, civil rights, and personal injury work.',
    },
    {
      category: 'position',
      label: 'Magistrate judge',
      summary: '1989-2001: Served as a magistrate judge in DeKalb County.',
    },
    {
      category: 'position',
      label: 'DeKalb County commissioner',
      summary: '2001-2006: Member of the DeKalb County Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Georgia's 4th congressional district.",
    },
  ],
  'house-nikema-williams-georgia-5th': [
    {
      category: 'position',
      label: 'Advocacy and public-policy work',
      summary:
        '2008-2018: Worked in reproductive-rights and public-policy advocacy, including senior policy roles with Planned Parenthood in Georgia and the Southeast.',
    },
    {
      category: 'position',
      label: 'Georgia State Senate',
      summary: '2017-2021: Member of the Georgia State Senate.',
    },
    {
      category: 'position',
      label: 'Democratic Party of Georgia',
      summary: '2019-2025: Served as chair of the Democratic Party of Georgia.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Georgia's 5th congressional district.",
    },
  ],
  'house-lucy-mcbath-georgia-6th': [
    {
      category: 'position',
      label: 'Gun-violence-prevention advocacy',
      summary:
        '2012-2018: Became a national gun-violence-prevention advocate after the killing of her son Jordan Davis.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Georgia's 6th congressional district.",
    },
  ],
  'house-richard-mccormick-georgia-7th': [
    {
      category: 'position',
      label: 'Military service',
      summary:
        '1990s-2020s: Served in the Marine Corps and Navy, including deployments as a helicopter pilot and later as a Navy doctor and commander.',
    },
    {
      category: 'position',
      label: 'Emergency medicine',
      summary: '2010s-2022: Practiced as an emergency room physician in the Atlanta area.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Georgia's 7th congressional district.",
    },
  ],
  'house-austin-scott-georgia-8th': [
    {
      category: 'position',
      label: 'Insurance business',
      summary:
        '1990s-2010: Owned and operated an insurance brokerage firm in south Georgia for nearly two decades.',
    },
    {
      category: 'position',
      label: 'Georgia House of Representatives',
      summary: '1997-2010: Member of the Georgia House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Georgia's 8th congressional district.",
    },
  ],
  'house-andrew-clyde-georgia-9th': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '1980s-2000s: Served for 28 years as a U.S. Navy officer, including combat deployments to Kuwait and Iraq.',
    },
    {
      category: 'position',
      label: 'Clyde Armory',
      summary:
        '1991-2020: Founded and built Clyde Armory into a nationwide firearms business based in northeast Georgia.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Georgia's 9th congressional district.",
    },
  ],
  'house-mike-collins-georgia-10th': [
    {
      category: 'position',
      label: 'Trucking and local business leadership',
      summary:
        '1990s-2022: Built a trucking company, led local business organizations, and served in credit-union and chamber leadership roles in Georgia.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Georgia's 10th congressional district.",
    },
  ],
  'house-barry-loudermilk-georgia-11th': [
    {
      category: 'position',
      label: 'Air Force and private-sector work',
      summary:
        '1980s-2004: Served in the U.S. Air Force and later built a private-sector career in Georgia before elected office.',
    },
    {
      category: 'position',
      label: 'Georgia General Assembly',
      summary: '2005-2013: Served in the Georgia House and then the Georgia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Georgia's 11th congressional district.",
    },
  ],
  'house-rick-allen-georgia-12th': [
    {
      category: 'position',
      label: 'Construction business',
      summary:
        '1970s-2014: Founded and built R.W. Allen & Associates into a major Georgia construction company.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Georgia's 12th congressional district.",
    },
  ],
  'house-david-scott-georgia-13th': [
    {
      category: 'position',
      label: 'Georgia House of Representatives',
      summary: '1974-1982: Member of the Georgia House of Representatives.',
    },
    {
      category: 'position',
      label: 'Georgia State Senate',
      summary: '1982-2002: Member of the Georgia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Georgia's 13th congressional district.",
    },
  ],
  'house-nancy-mace-south-carolina-1st': [
    {
      category: 'position',
      label: 'Writing, business, and public-facing work',
      summary:
        '1999-2018: Became the first woman to graduate from The Citadel Corps of Cadets, wrote a memoir, and later built a business in technology, marketing, and real estate.',
    },
    {
      category: 'position',
      label: 'South Carolina House of Representatives',
      summary: '2018-2020: Member of the South Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for South Carolina's 1st congressional district.",
    },
  ],
  'house-joe-wilson-south-carolina-2nd': [
    {
      category: 'position',
      label: 'Law, congressional staff, and executive-branch service',
      summary:
        '1970s-1984: Worked as a real-estate attorney, congressional staffer, and deputy general counsel at the U.S. Department of Energy.',
    },
    {
      category: 'position',
      label: 'Military service',
      summary:
        '1972-2003: Served in the Army Reserve and South Carolina Army National Guard, retiring as a colonel.',
    },
    {
      category: 'position',
      label: 'South Carolina State Senate',
      summary: '1984-2001: Member of the South Carolina State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-present: U.S. representative for South Carolina's 2nd congressional district.",
    },
  ],
  'house-sheri-biggs-south-carolina-3rd': [
    {
      category: 'position',
      label: 'Health-care career',
      summary:
        '1990s-2024: Built a long health-care career as a nurse, family nurse practitioner, psychiatric mental health nurse practitioner, administrator, and consultant.',
    },
    {
      category: 'position',
      label: 'Air National Guard service',
      summary:
        '2000s-2020s: Served in the Air National Guard, rising to lieutenant colonel and flying multiple combat and support missions as medical crew director.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for South Carolina's 3rd congressional district.",
    },
  ],
  'house-william-timmons-south-carolina-4th': [
    {
      category: 'position',
      label: 'Law, prosecution, and small business',
      summary:
        '2010s: Worked as a prosecutor and small-business owner while building his public profile in South Carolina.',
    },
    {
      category: 'position',
      label: 'South Carolina State Senate',
      summary: '2016-2018: Member of the South Carolina State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for South Carolina's 4th congressional district.",
    },
  ],
  'house-ralph-norman-south-carolina-5th': [
    {
      category: 'position',
      label: 'Construction and real-estate development',
      summary:
        '1975-2004: Worked in his family construction business and helped grow it into a major South Carolina commercial real-estate operation.',
    },
    {
      category: 'position',
      label: 'South Carolina House of Representatives',
      summary: '2005-2007 and 2009-2017: Member of the South Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for South Carolina's 5th congressional district.",
    },
  ],
  'house-james-clyburn-south-carolina-6th': [
    {
      category: 'position',
      label: 'Teaching and community development',
      summary:
        '1961-1971: Worked as a public-school teacher, employment counselor, and director of youth and community-development programs.',
    },
    {
      category: 'position',
      label: 'Governor staff and Human Affairs Commission',
      summary:
        '1971-1992: Served on Governor John C. West\'s staff and then as South Carolina Human Affairs commissioner.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for South Carolina's 6th congressional district.",
    },
    {
      category: 'position',
      label: 'House Democratic leadership',
      summary:
        '2000s-2020s: Held top House Democratic leadership roles, including multiple terms as majority whip and assistant Democratic leader.',
    },
  ],
  'house-russell-fry-south-carolina-7th': [
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '2000s-2015: Worked as an attorney on the Grand Strand after earning degrees from the University of South Carolina and Charleston School of Law.',
    },
    {
      category: 'position',
      label: 'South Carolina House of Representatives',
      summary: '2015-2022: Member of the South Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for South Carolina's 7th congressional district.",
    },
  ],
  'house-david-schweikert-arizona-1st': [
    {
      category: 'position',
      label: 'Arizona state legislature',
      summary:
        '1989-1994: Served in the Arizona state legislature, where he became majority whip and worked on budget, healthcare, and tax issues.',
    },
    {
      category: 'position',
      label: 'Arizona legal and business work',
      summary:
        '1990s-2004: Served in appointed Arizona policy roles, including chair of the state tax court, while helping build a family real-estate business.',
    },
    {
      category: 'position',
      label: 'Maricopa County treasurer',
      summary: '2004-2006: Treasurer of Maricopa County.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Arizona's 1st congressional district.",
    },
  ],
  'house-elijah-crane-arizona-2nd': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '2001-2014: Served in the U.S. Navy, including five wartime deployments and three deployments with SEAL Team 3.',
    },
    {
      category: 'position',
      label: 'Veteran-owned manufacturing business',
      summary:
        '2012-2022: Co-founded and built a veteran-owned manufacturing business that grew from a garage startup into a national brand.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Arizona's 2nd congressional district.",
    },
  ],
  'house-yassamin-ansari-arizona-3rd': [
    {
      category: 'position',
      label: 'Climate and public-policy work',
      summary:
        '2010s-2021: Worked in climate and public-policy roles before winning elected office in Phoenix.',
    },
    {
      category: 'position',
      label: 'Phoenix City Council and vice mayor',
      summary:
        '2021-2025: Served on the Phoenix City Council and later as vice mayor, becoming the youngest woman ever elected to the council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Arizona's 3rd congressional district.",
    },
  ],
  'house-greg-stanton-arizona-4th': [
    {
      category: 'position',
      label: 'Law and Arizona public service',
      summary:
        '1990s-2000: Worked in law and public service, including service as Arizona deputy attorney general.',
    },
    {
      category: 'position',
      label: 'Phoenix City Council',
      summary: '2000-2009: Member of the Phoenix City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Phoenix',
      summary: '2012-2018: Mayor of Phoenix.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Arizona's 4th congressional district.",
    },
  ],
  'house-andy-biggs-arizona-5th': [
    {
      category: 'position',
      label: 'Law and public life in Arizona',
      summary: '1990s-2002: Worked as a lawyer and built a public profile in Arizona before the legislature.',
    },
    {
      category: 'position',
      label: 'Arizona House of Representatives',
      summary: '2003-2011: Member of the Arizona House of Representatives.',
    },
    {
      category: 'position',
      label: 'Arizona State Senate',
      summary: '2011-2016: Member of the Arizona State Senate, later serving as Senate president.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Arizona's 5th congressional district.",
    },
  ],
  'house-juan-ciscomani-arizona-6th': [
    {
      category: 'position',
      label: 'University and chamber roles',
      summary:
        '2000s-2010s: Worked for the University of Arizona and the Tucson Hispanic Chamber of Commerce after graduating college.',
    },
    {
      category: 'position',
      label: 'Arizona governor administration',
      summary:
        '2010s-2022: Served in Governor Doug Ducey\'s administration as a senior advisor and vice chair of the Arizona-Mexico Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Arizona's 6th congressional district.",
    },
  ],
  'house-adelita-grijalva-arizona-7th': [
    {
      category: 'position',
      label: 'Pima County Teen Court',
      summary:
        '1990s-2025: Worked for more than 25 years at Pima County Teen Court, helping court-involved youth and their families.',
    },
    {
      category: 'position',
      label: 'Tucson Unified School District governing board',
      summary: '2002-2020: Member of the Tucson Unified School District governing board.',
    },
    {
      category: 'position',
      label: 'Pima County Board of Supervisors',
      summary: '2020-2025: Member of the Pima County Board of Supervisors, later serving as chair.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Arizona's 7th congressional district.",
    },
  ],
  'house-abraham-hamadeh-arizona-8th': [
    {
      category: 'position',
      label: 'Law and military service',
      summary:
        '2020s: Served as a Maricopa County prosecutor and as a U.S. Army Reserve captain and intelligence officer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Arizona's 8th congressional district.",
    },
  ],
  'house-paul-gosar-arizona-9th': [
    {
      category: 'position',
      label: 'Dentistry and small business',
      summary:
        '1980s-2010: Practiced dentistry and ran a small business in Flagstaff before entering politics.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Arizona's 9th congressional district.",
    },
  ],
  'house-dina-titus-nevada-1st': [
    {
      category: 'position',
      label: 'University teaching and writing',
      summary:
        '1979-2011: Taught political science at the University of Nevada, Las Vegas and wrote widely on Nevada and nuclear policy.',
    },
    {
      category: 'position',
      label: 'Nevada State Senate',
      summary: '1989-2009: Member of the Nevada State Senate, including long service as minority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2009-2011: Served her first term in the U.S. House.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: Returned to Congress as U.S. representative for Nevada's 1st congressional district.",
    },
  ],
  'house-mark-amodei-nevada-2nd': [
    {
      category: 'position',
      label: 'Army JAG and private law practice',
      summary:
        '1983-2004: Served in the U.S. Army Judge Advocate General\'s Corps and later practiced law in Nevada.',
    },
    {
      category: 'position',
      label: 'Nevada Legislature',
      summary:
        '1997-2011: Served in the Nevada Assembly and then the Nevada State Senate, including service as president pro tempore.',
    },
    {
      category: 'position',
      label: 'Nevada Mining Association',
      summary: '2007-2008: President of the Nevada Mining Association.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Nevada's 2nd congressional district.",
    },
  ],
  'house-susie-lee-nevada-3rd': [
    {
      category: 'position',
      label: 'Education nonprofit leadership',
      summary:
        '1993-2018: Led education nonprofits in Las Vegas, including founding the local After-School All-Stars chapter and later heading Communities In Schools of Nevada.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Nevada's 3rd congressional district.",
    },
  ],
  'house-steven-horsford-nevada-4th': [
    {
      category: 'position',
      label: 'Culinary Training Academy',
      summary:
        '2000s-2010s: Led the Culinary Training Academy in Las Vegas, helping expand a major workforce-training program.',
    },
    {
      category: 'position',
      label: 'Nevada State Senate',
      summary:
        '2000s-2012: Served in the Nevada State Senate, where he became Nevada\'s first African-American Senate majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2013-2015: Served his first term in the U.S. House.',
    },
    {
      category: 'position',
      label: 'Workforce and community development',
      summary:
        '2015-2022: Worked in business, youth workforce development, and community initiatives in southern Nevada.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: Returned to Congress as U.S. representative for Nevada's 4th congressional district.",
    },
  ],
  'house-blake-moore-utah-1st': [
    {
      category: 'position',
      label: 'Business development and Foreign Service',
      summary:
        '2000s-2010s: Worked abroad in business-development roles and served in the U.S. Foreign Service at the State Department.',
    },
    {
      category: 'position',
      label: 'Cicero Group',
      summary:
        '2010s-2020: Worked as a principal at Cicero Group, leading strategy and research projects across multiple industries.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Utah's 1st congressional district.",
    },
  ],
  'house-celeste-maloy-utah-2nd': [
    {
      category: 'position',
      label: 'Soil conservation work',
      summary:
        '1990s-2000s: Spent about a decade as a soil conservationist working with Utah families and farmers.',
    },
    {
      category: 'position',
      label: 'Public-lands and water law',
      summary:
        '2000s-2023: Built a legal career focused on public-lands and water issues in county and regional roles across southern Utah.',
    },
    {
      category: 'position',
      label: 'Chief legal counsel to Chris Stewart',
      summary: '2020s-2023: Served as chief legal counsel to Representative Chris Stewart.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Utah's 2nd congressional district.",
    },
  ],
  'house-mike-kennedy-utah-3rd': [
    {
      category: 'position',
      label: 'Family medicine',
      summary:
        '1990s-2020s: Practiced family medicine while also building a public-service career in Utah.',
    },
    {
      category: 'position',
      label: 'Utah House of Representatives',
      summary: '2013-2019: Member of the Utah House of Representatives.',
    },
    {
      category: 'position',
      label: 'Utah State Senate',
      summary: '2021-2025: Member of the Utah State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Utah's 3rd congressional district.",
    },
  ],
  'house-burgess-owens-utah-4th': [
    {
      category: 'position',
      label: 'Football career',
      summary:
        '1970s-1980s: Played football at the University of Miami and then spent ten seasons in the NFL, winning a Super Bowl with the Raiders.',
    },
    {
      category: 'position',
      label: 'Corporate sales and youth nonprofit work',
      summary:
        '1980s-2020: Worked in corporate sales and later founded Second Chance 4 Youth to help troubled and incarcerated youth.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Utah's 4th congressional district.",
    },
  ],
  'house-mariannette-miller-meeks-iowa-1st': [
    {
      category: 'position',
      label: 'Army and Army Reserve medical service',
      summary:
        '1976-2000: Served in the U.S. Army and Army Reserve as a nurse and later as a physician.',
    },
    {
      category: 'position',
      label: 'Academic medicine and ophthalmology',
      summary:
        '1990s-2010s: Worked in academic medicine at the University of Michigan and University of Iowa and practiced as an ophthalmologist.',
    },
    {
      category: 'position',
      label: 'Iowa Department of Public Health',
      summary: '2010-2013: Director of the Iowa Department of Public Health.',
    },
    {
      category: 'position',
      label: 'Iowa State Senate',
      summary: '2019-2020: Member of the Iowa State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Iowa's 1st congressional district.",
    },
  ],
  'house-ashley-hinson-iowa-2nd': [
    {
      category: 'position',
      label: 'Broadcast journalism',
      summary: '2000s-2017: Reporter and anchor in Iowa television news.',
    },
    {
      category: 'position',
      label: 'Iowa House of Representatives',
      summary: '2017-2020: Member of the Iowa House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Iowa's 2nd congressional district.",
    },
  ],
  'house-zachary-nunn-iowa-3rd': [
    {
      category: 'position',
      label: 'Military and national-security service',
      summary:
        '2000s-2020s: Served in the Air Force and Iowa Air National Guard and worked in national-security roles, including the National Security Council and the Office of the Director of National Intelligence.',
    },
    {
      category: 'position',
      label: 'Policy and teaching work',
      summary:
        '2000s-2020s: Also worked as a Senate staffer, cybersecurity consultant, and adjunct professor.',
    },
    {
      category: 'position',
      label: 'Iowa House of Representatives',
      summary: '2015-2019: Member of the Iowa House of Representatives.',
    },
    {
      category: 'position',
      label: 'Iowa State Senate',
      summary: '2019-2023: Member of the Iowa State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Iowa's 3rd congressional district.",
    },
  ],
  'house-randy-feenstra-iowa-4th': [
    {
      category: 'position',
      label: 'Business, banking, and teaching',
      summary:
        '1990s-2000s: Worked in business and banking and taught business and economics at Dordt University.',
    },
    {
      category: 'position',
      label: 'Hull city administrator',
      summary: '1999-2006: City administrator in Hull, Iowa.',
    },
    {
      category: 'position',
      label: 'Sioux County treasurer',
      summary: '2006-2008: Treasurer of Sioux County, Iowa.',
    },
    {
      category: 'position',
      label: 'Iowa State Senate',
      summary: '2009-2020: Member of the Iowa State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Iowa's 4th congressional district.",
    },
  ],
  'house-jonathan-jackson-illinois-1st': [
    {
      category: 'position',
      label: 'Business, nonprofit, and civic leadership',
      summary:
        '1990s-2022: Worked in business, nonprofit, and community-development roles in Chicago, including leadership connected to civil-rights and economic-opportunity efforts.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Illinois's 1st congressional district.",
    },
  ],
  'house-robin-kelly-illinois-2nd': [
    {
      category: 'position',
      label: 'Illinois House of Representatives',
      summary: '2003-2007: Member of the Illinois House of Representatives.',
    },
    {
      category: 'position',
      label: 'Illinois treasurer chief of staff',
      summary: '2007-2010: Chief of staff to Illinois State Treasurer Alexi Giannoulias.',
    },
    {
      category: 'position',
      label: 'Cook County administration',
      summary: '2010-2013: Chief administrative officer for Cook County.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Illinois's 2nd congressional district.",
    },
  ],
  'house-delia-ramirez-illinois-3rd': [
    {
      category: 'position',
      label: 'Social-service and community advocacy work',
      summary:
        '2000s-2018: Worked in social-service, housing, and community-advocacy roles in Chicago, including leadership in nonprofit and immigrant-community organizations.',
    },
    {
      category: 'position',
      label: 'Illinois House of Representatives',
      summary: '2018-2022: Member of the Illinois House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Illinois's 3rd congressional district.",
    },
  ],
  'house-jesus-garcia-illinois-4th': [
    {
      category: 'position',
      label: 'Chicago City Council',
      summary: '1986-1993: Member of the Chicago City Council.',
    },
    {
      category: 'position',
      label: 'Illinois State Senate',
      summary: '1993-1999: Member of the Illinois State Senate.',
    },
    {
      category: 'position',
      label: 'County and regional public service',
      summary:
        '2000s-2018: Served in regional public-service roles, including transit and county leadership in the Chicago area.',
    },
    {
      category: 'position',
      label: 'Cook County Board of Commissioners',
      summary: '2011-2018: Member of the Cook County Board of Commissioners.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Illinois's 4th congressional district.",
    },
  ],
  'house-mike-quigley-illinois-5th': [
    {
      category: 'position',
      label: 'Community and reform advocacy',
      summary:
        '1980s-1990s: Worked in community service and reform-oriented public advocacy in Chicago before county office.',
    },
    {
      category: 'position',
      label: 'Cook County Board of Commissioners',
      summary: '1998-2009: Member of the Cook County Board of Commissioners.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for Illinois's 5th congressional district.",
    },
  ],
  'house-sean-casten-illinois-6th': [
    {
      category: 'position',
      label: 'Clean-energy entrepreneurship',
      summary:
        '1990s-2018: Clean-energy entrepreneur and executive who founded and led companies focused on industrial energy efficiency and carbon reduction.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Illinois's 6th congressional district.",
    },
  ],
  'house-danny-davis-illinois-7th': [
    {
      category: 'position',
      label: 'Teaching and community work',
      summary: '1960s-1970s: Teacher, social worker, and community organizer in Chicago.',
    },
    {
      category: 'position',
      label: 'Chicago City Council',
      summary: '1979-1990: Alderman on the Chicago City Council.',
    },
    {
      category: 'position',
      label: 'Cook County Board of Commissioners',
      summary: '1990-1996: Member of the Cook County Board of Commissioners.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Illinois's 7th congressional district.",
    },
  ],
  'house-raja-krishnamoorthi-illinois-8th': [
    {
      category: 'position',
      label: 'Law, policy, and business work',
      summary:
        '1990s-2010s: Worked as a lawyer, policy adviser, and business executive in Illinois and Washington.',
    },
    {
      category: 'position',
      label: 'Illinois deputy treasurer',
      summary: '2007-2010: Deputy treasurer for the State of Illinois.',
    },
    {
      category: 'position',
      label: 'Private-sector leadership',
      summary:
        '2010-2016: Led technology and manufacturing businesses in the Chicago suburbs before entering Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Illinois's 8th congressional district.",
    },
  ],
  'house-janice-schakowsky-illinois-9th': [
    {
      category: 'position',
      label: 'Consumer-rights advocacy',
      summary: '1970s-1990: Consumer-rights activist, including leadership at Illinois Public Action.',
    },
    {
      category: 'position',
      label: 'Illinois House of Representatives',
      summary: '1991-1999: Member of the Illinois House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1999-present: U.S. representative for Illinois's 9th congressional district.",
    },
  ],
  'house-bradley-schneider-illinois-10th': [
    {
      category: 'position',
      label: 'Business and nonprofit leadership',
      summary:
        '1980s-2012: Worked in business, management consulting, and civic leadership in the Chicago suburbs.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2015: U.S. representative for Illinois's 10th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Illinois's 10th congressional district.",
    },
  ],
  'house-bill-foster-illinois-11th': [
    {
      category: 'position',
      label: 'Physics and technology entrepreneurship',
      summary:
        '1980s-2007: Particle physicist at Fermilab and technology entrepreneur who co-founded Electronic Theatre Controls.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2008-2011: U.S. representative for Illinois's 14th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Illinois's 11th congressional district.",
    },
  ],
  'house-mike-bost-illinois-12th': [
    {
      category: 'position',
      label: 'Local government and business work',
      summary:
        '1980s-1990s: Served in local government in southern Illinois while working in family business and public-service roles.',
    },
    {
      category: 'position',
      label: 'Illinois House of Representatives',
      summary: '1995-2014: Member of the Illinois House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Illinois's 12th congressional district.",
    },
  ],
  'house-nikki-budzinski-illinois-13th': [
    {
      category: 'position',
      label: 'Labor movement',
      summary:
        '2000s-2010s: Worked in organized labor and advocacy roles focused on wages, workplace safety, and worker protections.',
    },
    {
      category: 'position',
      label: 'Illinois governor and state policy roles',
      summary:
        '2019-2021: Senior adviser to Illinois Governor J.B. Pritzker and a key figure in labor and broadband policy work.',
    },
    {
      category: 'position',
      label: 'White House budget and manufacturing policy',
      summary:
        '2021-2022: Worked at the Office of Management and Budget and helped launch the Made in America Office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Illinois's 13th congressional district.",
    },
  ],
  'house-lauren-underwood-illinois-14th': [
    {
      category: 'position',
      label: 'Nursing and public-health policy',
      summary:
        '2010s: Registered nurse and public-health policy adviser, including work at the Department of Health and Human Services on Affordable Care Act implementation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Illinois's 14th congressional district.",
    },
  ],
  'house-mary-miller-illinois-15th': [
    {
      category: 'position',
      label: 'Farming and family business',
      summary: '1970s-2020: Worked in family farming and business operations in east-central Illinois.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Illinois's 15th congressional district.",
    },
  ],
  'house-darin-lahood-illinois-16th': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary: '1990-1994: Worked on Capitol Hill as a congressional staffer.',
    },
    {
      category: 'position',
      label: 'Federal prosecution',
      summary: '2001-2005: Served as a federal prosecutor in Nevada and central Illinois.',
    },
    {
      category: 'position',
      label: 'Illinois State Senate',
      summary: '2011-2015: Member of the Illinois State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Illinois's 16th congressional district.",
    },
  ],
  'house-eric-sorensen-illinois-17th': [
    {
      category: 'position',
      label: 'Broadcast meteorology',
      summary:
        '2000s-2022: Local TV meteorologist in Rockford and the Quad Cities, known for communicating severe-weather and climate coverage across the region.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Illinois's 17th congressional district.",
    },
  ],
  'house-sarah-mcbride-delaware-at-large': [
    {
      category: 'position',
      label: 'State government and advocacy work',
      summary:
        '2010s: Worked in Delaware state government and national advocacy, including roles with Governor Jack Markell, Attorney General Beau Biden, and the Human Rights Campaign.',
    },
    {
      category: 'position',
      label: 'National LGBTQ advocacy',
      summary:
        '2016-2020: National spokesperson for the Human Rights Campaign and a prominent voice in LGBTQ rights advocacy.',
    },
    {
      category: 'position',
      label: 'Delaware State Senate',
      summary: '2020-2025: Member of the Delaware State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2025-present: U.S. representative for Delaware at large.',
    },
  ],
  'house-andy-harris-maryland-1st': [
    {
      category: 'position',
      label: 'Medicine at Johns Hopkins',
      summary:
        '1980s-2010s: Physician and anesthesiologist at Johns Hopkins Hospital, specializing in obstetric anesthesiology.',
    },
    {
      category: 'position',
      label: 'United States Naval Reserve',
      summary:
        '1988-2010s: Medical officer in the Naval Reserve who later established and commanded the Johns Hopkins medical reserve unit.',
    },
    {
      category: 'position',
      label: 'Maryland State Senate',
      summary: '1999-2010: Member of the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Maryland's 1st congressional district.",
    },
  ],
  'house-johnny-olszewski-maryland-2nd': [
    {
      category: 'position',
      label: 'Teaching and public-service work',
      summary: '2000s: Public-school teacher and community leader in Baltimore County before higher office.',
    },
    {
      category: 'position',
      label: 'Maryland House of Delegates',
      summary: '2006-2015: Member of the Maryland House of Delegates.',
    },
    {
      category: 'position',
      label: 'Baltimore County executive',
      summary: '2018-2025: Executive of Baltimore County, Maryland.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Maryland's 2nd congressional district.",
    },
  ],
  'house-sarah-elfreth-maryland-3rd': [
    {
      category: 'position',
      label: 'Public-policy and government-affairs work',
      summary:
        '2000s-2010s: Worked in public-policy and government-affairs roles, including at Johns Hopkins and the National Aquarium.',
    },
    {
      category: 'position',
      label: 'Annapolis City Council',
      summary: '2013-2019: Member of the Annapolis City Council.',
    },
    {
      category: 'position',
      label: 'Maryland State Senate',
      summary: '2019-2025: Member of the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Maryland's 3rd congressional district.",
    },
  ],
  'house-glenn-ivey-maryland-4th': [
    {
      category: 'position',
      label: 'Legal and congressional work',
      summary:
        '1980s-2000s: Worked as a prosecutor, congressional staffer, and public lawyer in Maryland and Washington.',
    },
    {
      category: 'position',
      label: 'Maryland Public Service Commission',
      summary: '2000-2003: Member and chair of the Maryland Public Service Commission.',
    },
    {
      category: 'position',
      label: "Prince George's County state's attorney",
      summary: "2003-2010: State's attorney for Prince George's County, Maryland.",
    },
    {
      category: 'position',
      label: 'Law, teaching, and public advocacy',
      summary: '2010s-2022: Returned to legal practice, teaching, and public-policy work before Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Maryland's 4th congressional district.",
    },
  ],
  'house-steny-hoyer-maryland-5th': [
    {
      category: 'position',
      label: 'Maryland state politics',
      summary: '1967-1978: Served in the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'President of the Maryland Senate',
      summary: '1975-1978: President of the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'Maryland higher-education leadership',
      summary: '1979-1981: Member of the Maryland Board of Regents and State Board for Higher Education.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1981-present: U.S. representative for Maryland's 5th congressional district.",
    },
    {
      category: 'position',
      label: 'House Democratic leadership',
      summary:
        '1989-2023: Held senior House Democratic leadership posts, including whip, caucus chair, majority leader, and minority whip.',
    },
  ],
  'house-april-mcclain-delaney-maryland-6th': [
    {
      category: 'position',
      label: 'Law, business, and nonprofit leadership',
      summary:
        '1990s-2020s: Lawyer and executive in business and nonprofit organizations, including work in telecommunications and digital-safety policy.',
    },
    {
      category: 'position',
      label: 'Common Sense Media',
      summary: '2018-2022: Chief operating officer of Common Sense Media.',
    },
    {
      category: 'position',
      label: 'Commerce Department broadband policy',
      summary:
        '2022-2024: Deputy assistant secretary for communications and information at the Commerce Department.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Maryland's 6th congressional district.",
    },
  ],
  'house-kweisi-mfume-maryland-7th': [
    {
      category: 'position',
      label: 'Baltimore City Council',
      summary: '1979-1986: Member of the Baltimore City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1987-1996: U.S. representative for Maryland's 7th congressional district.",
    },
    {
      category: 'position',
      label: 'NAACP',
      summary: '1996-2004: President and chief executive of the NAACP.',
    },
    {
      category: 'position',
      label: 'Media and civic work',
      summary: '2000s-2020: Worked in media, advocacy, and civic leadership before returning to Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2020-present: U.S. representative for Maryland's 7th congressional district.",
    },
  ],
  'house-jamie-raskin-maryland-8th': [
    {
      category: 'position',
      label: 'Constitutional law and writing',
      summary: '1990s-2010s: Constitutional-law professor, author, and legal commentator.',
    },
    {
      category: 'position',
      label: 'Maryland State Senate',
      summary: '2007-2016: Member of the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Maryland's 8th congressional district.",
    },
  ],
  'house-robert-wittman-virginia-1st': [
    {
      category: 'position',
      label: 'Science, public health, and local government',
      summary:
        '1980s-2000s: Worked in public health and environmental-science roles while serving in local government on Virginia’s Northern Neck.',
    },
    {
      category: 'position',
      label: 'Westmoreland County Board of Supervisors',
      summary: '1986-2005: Member of the Westmoreland County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'Mayor of Montross',
      summary: '1992-1996: Mayor of Montross, Virginia.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '2006-2007: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Virginia's 1st congressional district.",
    },
  ],
  'house-jennifer-kiggans-virginia-2nd': [
    {
      category: 'position',
      label: 'United States Navy',
      summary:
        '1990s-2000s: Served as a Navy helicopter pilot, including deployments to the Persian Gulf.',
    },
    {
      category: 'position',
      label: 'Nurse practitioner',
      summary:
        '2000s-2020s: Worked in health care as an adult-geriatric primary-care nurse practitioner.',
    },
    {
      category: 'position',
      label: 'Virginia State Senate',
      summary: '2020-2022: Member of the Virginia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Virginia's 2nd congressional district.",
    },
  ],
  'house-robert-scott-virginia-3rd': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1970s: Lawyer in the Hampton Roads region before elected office.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '1978-1983: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'Virginia State Senate',
      summary: '1983-1993: Member of the Virginia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for Virginia's 3rd congressional district.",
    },
  ],
  'house-jennifer-mcclellan-virginia-4th': [
    {
      category: 'position',
      label: 'Law and public-policy work',
      summary:
        '1990s-2000s: Lawyer and policy advocate in Virginia before winning state legislative office.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '2006-2017: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'Virginia State Senate',
      summary: '2017-2023: Member of the Virginia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Virginia's 4th congressional district.",
    },
  ],
  'house-john-mcguire-virginia-5th': [
    {
      category: 'position',
      label: 'United States Navy SEALs',
      summary:
        '1990s-2010s: Served in the Navy SEALs, including combat deployments in Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Small business ownership',
      summary: '2010s: Built and ran fitness and small-business ventures in central Virginia.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '2018-2024: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'Virginia State Senate',
      summary: '2024-2025: Member of the Virginia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Virginia's 5th congressional district.",
    },
  ],
  'house-ben-cline-virginia-6th': [
    {
      category: 'position',
      label: 'Congressional staff and legal work',
      summary:
        '1990s-2002: Worked as a congressional staffer and legal counsel to Representative Bob Goodlatte.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '2002-2018: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Virginia's 6th congressional district.",
    },
  ],
  'house-eugene-vindman-virginia-7th': [
    {
      category: 'position',
      label: 'United States Army service',
      summary:
        '2000s-2022: Army officer whose career included infantry and paratrooper assignments, legal service in the Judge Advocate General’s Corps, and senior national-security roles.',
    },
    {
      category: 'position',
      label: 'War-crimes accountability work',
      summary:
        '2022-2024: Worked on military-analysis and prosecution support related to atrocity-crimes investigations tied to Russia’s war against Ukraine.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Virginia's 7th congressional district.",
    },
  ],
  'house-donald-beyer-virginia-8th': [
    {
      category: 'position',
      label: 'Business leadership',
      summary:
        '1970s-2000s: Led the family automobile business and became a prominent business and civic figure in Northern Virginia.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Virginia',
      summary: '1990-1998: Lieutenant governor of Virginia.',
    },
    {
      category: 'position',
      label: 'United States ambassador',
      summary: '2009-2013: U.S. ambassador to Switzerland and Liechtenstein.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Virginia's 8th congressional district.",
    },
  ],
  'house-h-griffith-virginia-9th': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1980s-1990s: Attorney in southwest Virginia before federal office.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary:
        '1994-2010: Member of the Virginia House of Delegates, including service as House majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Virginia's 9th congressional district.",
    },
  ],
  'house-suhas-subramanyam-virginia-10th': [
    {
      category: 'position',
      label: 'Technology, law, and White House policy work',
      summary:
        '2000s-2010s: Lawyer, startup operator, and technology-policy official, including service in the Obama White House.',
    },
    {
      category: 'position',
      label: 'Virginia House of Delegates',
      summary: '2020-2024: Member of the Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'Virginia State Senate',
      summary: '2024-2025: Member of the Virginia State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Virginia's 10th congressional district.",
    },
  ],
  'house-james-walkinshaw-virginia-11th': [
    {
      category: 'position',
      label: 'Congressional staff and oversight work',
      summary:
        '2000s-2020: Congressional staffer focused on oversight and federal-workforce issues, including senior aide and chief-of-staff roles for Representative Gerry Connolly.',
    },
    {
      category: 'position',
      label: 'Fairfax County Board of Supervisors',
      summary: '2020-2025: Member of the Fairfax County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Virginia's 11th congressional district.",
    },
  ],
  'house-jack-bergman-michigan-1st': [
    {
      category: 'position',
      label: 'United States Marine Corps',
      summary: '1969-2009: Served in the U.S. Marine Corps as an aviator and officer, retiring as a lieutenant general.',
    },
    {
      category: 'position',
      label: 'Business and aviation',
      summary:
        '1980s-2010s: Owned medical-equipment businesses and spent 22 years as a commercial airline pilot.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Michigan's 1st congressional district.",
    },
  ],
  'house-john-moolenaar-michigan-2nd': [
    {
      category: 'position',
      label: 'Chemistry, business, and school administration',
      summary: '1980s-2000s: Worked as a chemist, then in business development and school administration.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '2003-2008: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'Michigan State Senate',
      summary: '2011-2014: Member of the Michigan State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Michigan's 2nd congressional district.",
    },
  ],
  'house-hillary-scholten-michigan-3rd': [
    {
      category: 'position',
      label: 'Social work',
      summary: '2000s: Began her career as a social worker focused on housing and homelessness.',
    },
    {
      category: 'position',
      label: 'Immigration and civil-rights law',
      summary:
        '2010s-2022: Served as an immigration and civil-rights lawyer, including a Second Circuit clerkship, Justice Department service, and private practice.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Michigan's 3rd congressional district.",
    },
  ],
  'house-bill-huizenga-michigan-4th': [
    {
      category: 'position',
      label: 'Congressional staff and business',
      summary:
        '1990s-2002: Worked as a congressional staffer for Representative Peter Hoekstra and as a business owner in west Michigan.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '2003-2008: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Michigan's 4th congressional district, after first serving the old 2nd district.",
    },
  ],
  'house-tim-walberg-michigan-5th': [
    {
      category: 'position',
      label: 'Pastoral and ministry work',
      summary:
        '1970s-2000s: Worked as a pastor, Christian educator, and ministry administrator in Michigan and Indiana.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '1983-1998: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2007-2009: U.S. representative during his first term in Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2011-present: Returned to Congress and has represented southern Michigan since 2011.',
    },
  ],
  'house-debbie-dingell-michigan-6th': [
    {
      category: 'position',
      label: 'Advocacy and auto-industry leadership',
      summary:
        '1970s-2014: Worked as an analyst, advocate, and auto-industry executive, including senior public-affairs roles and leadership of the GM Foundation.',
    },
    {
      category: 'position',
      label: 'Wayne State University Board of Governors',
      summary: '2007-2014: Served on the Wayne State University Board of Governors, including as chair.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Michigan's 6th congressional district.",
    },
  ],
  'house-tom-barrett-michigan-7th': [
    {
      category: 'position',
      label: 'United States Army',
      summary: '2000-2022: Served in the U.S. Army, including as a helicopter pilot and officer.',
    },
    {
      category: 'position',
      label: 'Michigan state treasurer staff',
      summary: 'Early 2010s: Worked on the staff of the Michigan state treasurer.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '2015-2019: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'Michigan State Senate',
      summary: '2019-2023: Member of the Michigan State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Michigan's 7th congressional district.",
    },
  ],
  'house-kristen-mcdonald-rivet-michigan-8th': [
    {
      category: 'position',
      label: 'State policy and nonprofit work',
      summary:
        '2004-2018: Worked in Michigan human-services and education roles and later in nonprofit leadership, including Michigan Head Start and The Skillman Foundation.',
    },
    {
      category: 'position',
      label: 'Bay City commissioner',
      summary: '2019-2022: City commissioner in Bay City, Michigan.',
    },
    {
      category: 'position',
      label: 'Michigan State Senate',
      summary: '2023-2025: Member of the Michigan State Senate and assistant majority floor leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Michigan's 8th congressional district.",
    },
  ],
  'house-lisa-mcclain-michigan-9th': [
    {
      category: 'position',
      label: 'Business and financial consulting',
      summary:
        '1980s-2020: Built a long private-sector career as a business executive and financial consultant in Michigan.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2021-present: U.S. representative for Michigan and later elected House Republican Conference chair.',
    },
  ],
  'house-john-james-michigan-10th': [
    {
      category: 'position',
      label: 'United States Army',
      summary: '2004-2012: Served as a U.S. Army aviation officer, including combat deployments in Iraq.',
    },
    {
      category: 'position',
      label: 'Business leadership',
      summary:
        '2012-2022: Led James Group International and Renaissance Global Logistics as a business executive in metro Detroit.',
    },
    {
      category: 'position',
      label: 'U.S. Senate campaigns',
      summary: '2018 and 2020: Republican nominee for the U.S. Senate in Michigan.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Michigan's 10th congressional district.",
    },
  ],
  'house-haley-stevens-michigan-11th': [
    {
      category: 'position',
      label: 'Presidential campaigns',
      summary: '2007-2008: Worked on the presidential campaigns of Hillary Clinton and Barack Obama.',
    },
    {
      category: 'position',
      label: 'Obama administration manufacturing work',
      summary:
        '2009-2011: Chief of staff to the U.S. Auto Rescue Task Force and helped launch federal manufacturing-recovery offices.',
    },
    {
      category: 'position',
      label: 'Business and manufacturing policy',
      summary: '2010s: Worked as a business executive and manufacturing-policy leader focused on the future of work.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Michigan's 11th congressional district.",
    },
  ],
  'house-rashida-tlaib-michigan-12th': [
    {
      category: 'position',
      label: 'Law and community advocacy',
      summary:
        '2000s: Worked as a lawyer and community advocate, including service on the staff of the Michigan House.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '2009-2014: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Michigan's 12th congressional district.",
    },
  ],
  'house-shri-thanedar-michigan-13th': [
    {
      category: 'position',
      label: 'Science and entrepreneurship',
      summary:
        '1980s-2010s: Worked as a chemist and serial entrepreneur who built and ran testing and pharmaceutical-services companies.',
    },
    {
      category: 'position',
      label: 'Michigan governor campaign',
      summary: '2018: Ran for the Democratic nomination for governor of Michigan.',
    },
    {
      category: 'position',
      label: 'Michigan House of Representatives',
      summary: '2021-2023: Member of the Michigan House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Michigan's 13th congressional district.",
    },
  ],
  'house-angie-craig-minnesota-2nd': [
    {
      category: 'position',
      label: 'Journalism and corporate communications',
      summary:
        '1980s-2010s: Worked as a newspaper reporter and later as a corporate communications and public-affairs executive, including senior leadership at St. Jude Medical.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Minnesota's 2nd congressional district.",
    },
  ],
  'house-betty-mccollum-minnesota-4th': [
    {
      category: 'position',
      label: 'Teaching and business work',
      summary:
        '1970s-1980s: Worked as a teacher and later in retail sales and management before elected office.',
    },
    {
      category: 'position',
      label: 'North St. Paul City Council',
      summary: '1987-1992: Member of the North St. Paul City Council.',
    },
    {
      category: 'position',
      label: 'Minnesota House of Representatives',
      summary: '1993-2001: Member of the Minnesota House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-present: U.S. representative for Minnesota's 4th congressional district.",
    },
  ],
  'house-brad-finstad-minnesota-1st': [
    {
      category: 'position',
      label: 'Farming and agricultural leadership',
      summary:
        '2000s-2010s: Worked in family farming and agricultural-policy leadership, including roles with the Minnesota Turkey Growers Association and the Center for Rural Policy and Development.',
    },
    {
      category: 'position',
      label: 'Minnesota House of Representatives',
      summary: '2003-2009: Member of the Minnesota House of Representatives.',
    },
    {
      category: 'position',
      label: 'USDA Rural Development',
      summary: '2017-2021: Minnesota state director for USDA Rural Development.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2022-present: U.S. representative for Minnesota's 1st congressional district.",
    },
  ],
  'house-ilhan-omar-minnesota-5th': [
    {
      category: 'position',
      label: 'Community education and policy work',
      summary:
        '2000s-2016: Worked in community education, policy, and advocacy in Minneapolis, including civic-organizing and public-service roles.',
    },
    {
      category: 'position',
      label: 'Minnesota House of Representatives',
      summary: '2017-2019: Member of the Minnesota House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Minnesota's 5th congressional district.",
    },
  ],
  'house-kelly-morrison-minnesota-3rd': [
    {
      category: 'position',
      label: 'Obstetrics and gynecology',
      summary: '1990s-2020s: Practiced medicine as an obstetrician-gynecologist in Minnesota.',
    },
    {
      category: 'position',
      label: 'Minnesota House of Representatives',
      summary: '2019-2023: Member of the Minnesota House of Representatives.',
    },
    {
      category: 'position',
      label: 'Minnesota Senate',
      summary: '2023-2025: Member of the Minnesota Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Minnesota's 3rd congressional district.",
    },
  ],
  'house-michelle-fischbach-minnesota-7th': [
    {
      category: 'position',
      label: 'Minnesota Senate',
      summary: '1996-2018: Member of the Minnesota Senate.',
    },
    {
      category: 'position',
      label: 'President of the Minnesota Senate',
      summary: '2011-2013 and 2017-2018: President of the Minnesota Senate.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Minnesota',
      summary: '2018-2019: Lieutenant governor of Minnesota.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Minnesota's 7th congressional district.",
    },
  ],
  'house-pete-stauber-minnesota-8th': [
    {
      category: 'position',
      label: 'Hockey and law enforcement',
      summary:
        '1980s-2017: Played college and minor-league hockey, then served as a police officer in Duluth.',
    },
    {
      category: 'position',
      label: 'Hermantown City Council',
      summary: '2000s-2013: Member of the Hermantown City Council.',
    },
    {
      category: 'position',
      label: 'St. Louis County commissioner',
      summary: '2013-2019: St. Louis County commissioner.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Minnesota's 8th congressional district.",
    },
  ],
  'house-tom-emmer-minnesota-6th': [
    {
      category: 'position',
      label: 'Law and local government',
      summary:
        '1980s-2000s: Practiced law, ran a small business, and served on local city councils in Minnesota.',
    },
    {
      category: 'position',
      label: 'Minnesota House of Representatives',
      summary: '2005-2011: Member of the Minnesota House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Minnesota's 6th congressional district.",
    },
  ],
  'house-julie-fedorchak-north-dakota-at-large': [
    {
      category: 'position',
      label: 'Communications and public affairs',
      summary:
        '1990s-2010s: Worked in communications, media, and public affairs, including service as communications director to Governor Ed Schafer and later running her own business.',
    },
    {
      category: 'position',
      label: 'State director for Senator John Hoeven',
      summary: '2011-2012: State director for Senator John Hoeven.',
    },
    {
      category: 'position',
      label: 'North Dakota Public Service Commission',
      summary: '2012-2025: North Dakota public service commissioner.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2025-present: U.S. representative for North Dakota at large.',
    },
  ],
  'house-dusty-johnson-south-dakota-at-large': [
    {
      category: 'position',
      label: 'South Dakota Public Utilities Commission',
      summary: '2005-2011: South Dakota public utilities commissioner.',
    },
    {
      category: 'position',
      label: "Governor's office",
      summary: '2011-2014: Chief of staff to Governor Dennis Daugaard.',
    },
    {
      category: 'position',
      label: 'Vantage Point Solutions',
      summary: '2014-2018: Vice president at Vantage Point Solutions.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2019-present: U.S. representative for South Dakota at large.',
    },
  ],
  'house-becca-balint-vermont-at-large': [
    {
      category: 'position',
      label: 'Education and local activism',
      summary:
        '1990s-2015: Worked as a teacher, school administrator, and local activist in southern Vermont.',
    },
    {
      category: 'position',
      label: 'Vermont Senate',
      summary: '2015-2023: Member of the Vermont Senate.',
    },
    {
      category: 'position',
      label: 'President pro tempore of the Vermont Senate',
      summary: '2021-2023: President pro tempore of the Vermont Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: '2023-present: U.S. representative for Vermont at large.',
    },
  ],
  'house-chellie-pingree-maine-1st': [
    {
      category: 'position',
      label: 'Farming, business, and local boards',
      summary:
        '1980s-1991: Worked in farming and small business and served on local boards in Maine.',
    },
    {
      category: 'position',
      label: 'Maine Senate',
      summary: '1992-2000: Member of the Maine Senate, including service as majority leader.',
    },
    {
      category: 'position',
      label: 'Common Cause',
      summary: '2003-2007: President and chief executive of Common Cause.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for Maine's 1st congressional district.",
    },
  ],
  'house-jared-golden-maine-2nd': [
    {
      category: 'position',
      label: 'United States Marine Corps',
      summary:
        '2000s: Served in the U.S. Marine Corps, including deployments to Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Legislative and policy staff roles',
      summary:
        '2010s: Worked in legislative and policy staff roles in Washington and Maine before running for office.',
    },
    {
      category: 'position',
      label: 'Maine House of Representatives',
      summary: '2014-2019: Member of the Maine House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Maine's 2nd congressional district.",
    },
  ],
  'house-chris-pappas-new-hampshire-1st': [
    {
      category: 'position',
      label: 'Family business',
      summary: "2000s-present: Helped run his family's restaurant and food-service business in Manchester.",
    },
    {
      category: 'position',
      label: 'New Hampshire House of Representatives',
      summary: '2003-2007: Member of the New Hampshire House of Representatives.',
    },
    {
      category: 'position',
      label: 'Hillsborough County treasurer',
      summary: '2007-2011: Treasurer of Hillsborough County, New Hampshire.',
    },
    {
      category: 'position',
      label: 'New Hampshire Executive Council',
      summary: '2013-2019: Member of the New Hampshire Executive Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for New Hampshire's 1st congressional district.",
    },
  ],
  'house-maggie-goodlander-new-hampshire-2nd': [
    {
      category: 'position',
      label: 'Senate national-security staff work',
      summary:
        '2009-2013: Worked in Senate foreign-policy and homeland-security staff roles, including work for Senators Joe Lieberman and John McCain.',
    },
    {
      category: 'position',
      label: 'Navy Reserve and legal work',
      summary:
        '2010s-2020s: Served in the Navy Reserve while holding legal and national-security roles, including clerkships and senior policy work.',
    },
    {
      category: 'position',
      label: 'House Judiciary, Justice Department, and White House roles',
      summary:
        '2019-2024: Served as counsel on the House Judiciary Committee, then in senior Justice Department and White House roles.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New Hampshire's 2nd congressional district.",
    },
  ],
  'house-ayanna-pressley-massachusetts-7th': [
    {
      category: 'position',
      label: 'Congressional and Senate aide',
      summary:
        '1990s-2009: Worked in constituent-service and senior staff roles for Representative Joseph P. Kennedy II and Senator John Kerry.',
    },
    {
      category: 'position',
      label: 'Boston City Council',
      summary: '2010-2019: Member of the Boston City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Massachusetts's 7th congressional district.",
    },
  ],
  'house-jake-auchincloss-massachusetts-4th': [
    {
      category: 'position',
      label: 'United States Marine Corps',
      summary:
        '2010-2015: Served as a Marine officer, including deployments to Afghanistan and Panama.',
    },
    {
      category: 'position',
      label: 'Business and local government',
      summary: '2015-2020: Worked in business and served on the Newton City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Massachusetts's 4th congressional district.",
    },
  ],
  'house-james-mcgovern-massachusetts-2nd': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary:
        '1980s-1996: Worked for more than a decade as a congressional aide to Representative Joe Moakley.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Massachusetts's 2nd congressional district.",
    },
  ],
  'house-katherine-clark-massachusetts-5th': [
    {
      category: 'position',
      label: 'Legal and child-policy work',
      summary:
        '1990s-2000s: Worked as an attorney and in child-protection and public-policy roles in Massachusetts.',
    },
    {
      category: 'position',
      label: 'Melrose School Committee',
      summary: '2001-2007: Member of the Melrose School Committee.',
    },
    {
      category: 'position',
      label: 'Massachusetts House of Representatives',
      summary: '2008-2011: Member of the Massachusetts House of Representatives.',
    },
    {
      category: 'position',
      label: 'Massachusetts Senate',
      summary: '2011-2013: Member of the Massachusetts Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Massachusetts's 5th congressional district.",
    },
  ],
  'house-lori-trahan-massachusetts-3rd': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary:
        '1990s-2005: Worked for Representative Marty Meehan, rising to chief of staff.',
    },
    {
      category: 'position',
      label: 'Business and consulting',
      summary:
        '2005-2019: Worked in business, consulting, and executive roles, including cofounding Concire.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Massachusetts's 3rd congressional district.",
    },
  ],
  'house-richard-neal-massachusetts-1st': [
    {
      category: 'position',
      label: 'Teaching and Springfield city government',
      summary:
        '1970s-1984: Worked as a teacher and served in Springfield city government before becoming mayor.',
    },
    {
      category: 'position',
      label: 'Mayor of Springfield',
      summary: '1984-1988: Mayor of Springfield, Massachusetts.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1989-present: U.S. representative for Massachusetts's 1st congressional district.",
    },
  ],
  'house-seth-moulton-massachusetts-6th': [
    {
      category: 'position',
      label: 'United States Marine Corps',
      summary:
        '2000s: Served as a Marine officer with combat tours in Iraq and later special-assignment work abroad.',
    },
    {
      category: 'position',
      label: 'Business and infrastructure work',
      summary:
        '2009-2014: Worked in business and transportation-infrastructure roles after military service.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Massachusetts's 6th congressional district.",
    },
  ],
  'house-stephen-lynch-massachusetts-8th': [
    {
      category: 'position',
      label: 'Ironworker and labor leadership',
      summary:
        '1970s-1990s: Worked as an ironworker and later in labor-union leadership before entering elected office.',
    },
    {
      category: 'position',
      label: 'Massachusetts House of Representatives',
      summary: '1995-1996: Member of the Massachusetts House of Representatives.',
    },
    {
      category: 'position',
      label: 'Massachusetts Senate',
      summary: '1996-2001: Member of the Massachusetts Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-present: U.S. representative for Massachusetts's 8th congressional district.",
    },
  ],
  'house-william-keating-massachusetts-9th': [
    {
      category: 'position',
      label: 'Massachusetts House of Representatives',
      summary: '1977-1984: Member of the Massachusetts House of Representatives.',
    },
    {
      category: 'position',
      label: 'Massachusetts Senate',
      summary: '1985-1999: Member of the Massachusetts Senate.',
    },
    {
      category: 'position',
      label: 'District attorney',
      summary: '1999-2010: District attorney for Norfolk County, Massachusetts.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Massachusetts's 9th congressional district.",
    },
  ],
  'house-brian-fitzpatrick-pennsylvania-1st': [
    {
      category: 'position',
      label: 'FBI and federal prosecution',
      summary:
        '2000s-2016: Served as an FBI special agent and federal prosecutor, including national-security and anti-corruption work.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Pennsylvania's 1st congressional district.",
    },
  ],
  'house-brendan-boyle-pennsylvania-2nd': [
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2008-2015: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Pennsylvania's 2nd congressional district.",
    },
  ],
  'house-dwight-evans-pennsylvania-3rd': [
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '1981-2016: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'Pennsylvania House leadership',
      summary:
        '1990s-2016: Senior state-budget and economic-development leader, including service as the first Black chair of the House Appropriations Committee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2016-present: U.S. representative for Pennsylvania's 3rd congressional district.",
    },
  ],
  'house-madeleine-dean-pennsylvania-4th': [
    {
      category: 'position',
      label: 'Law, mediation, and teaching',
      summary:
        '1980s-2012: Worked as a lawyer, mediator, and professor in Montgomery County, Pennsylvania.',
    },
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2012-2018: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Pennsylvania's 4th congressional district.",
    },
  ],
  'house-mary-gay-scanlon-pennsylvania-5th': [
    {
      category: 'position',
      label: 'Law and civic leadership',
      summary:
        '1980s-2018: Worked as an attorney and civic leader focused on public-interest and education issues in the Philadelphia suburbs.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2018-present: U.S. representative for Pennsylvania's 5th congressional district.",
    },
  ],
  'house-chrissy-houlahan-pennsylvania-6th': [
    {
      category: 'position',
      label: 'Air Force service',
      summary:
        '1990s: Served in the U.S. Air Force and Air Force Reserve after studying engineering at Stanford.',
    },
    {
      category: 'position',
      label: 'Business leadership',
      summary:
        '2000s-2010s: Held executive roles in Pennsylvania businesses, including AND1 and B Lab.',
    },
    {
      category: 'position',
      label: 'Education and nonprofit work',
      summary:
        '2010s: Taught through Teach For America and later led an education nonprofit focused on literacy and student support.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Pennsylvania's 6th congressional district.",
    },
  ],
  'house-ryan-mackenzie-pennsylvania-7th': [
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2012-2024: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Pennsylvania's 7th congressional district.",
    },
  ],
  'house-robert-bresnahan-pennsylvania-8th': [
    {
      category: 'position',
      label: 'Family business and construction leadership',
      summary:
        '2000s-2013: Worked in his family’s electrical-contracting business in northeastern Pennsylvania.',
    },
    {
      category: 'position',
      label: 'Kuharchik Construction and development work',
      summary:
        '2013-2024: Chief executive of Kuharchik Construction and founder of a real-estate development group in NEPA.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Pennsylvania's 8th congressional district.",
    },
  ],
  'house-daniel-meuser-pennsylvania-9th': [
    {
      category: 'position',
      label: 'Business leadership',
      summary:
        '1988-2011: Helped build Pride Mobility into a major mobility-products company and later served as president of Pride USA.',
    },
    {
      category: 'position',
      label: 'Pennsylvania Department of Revenue',
      summary: '2011-2015: Secretary of Revenue for Pennsylvania.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Pennsylvania's 9th congressional district.",
    },
  ],
  'house-scott-perry-pennsylvania-10th': [
    {
      category: 'position',
      label: 'Army and National Guard service',
      summary:
        '1980s-present: Served in the Army and later the Pennsylvania Army National Guard, including deployment to Iraq.',
    },
    {
      category: 'position',
      label: 'Small business and local work',
      summary:
        '1990s-2000s: Owned a Dillsburg-area business and worked in a range of trades and local community roles.',
    },
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2007-2013: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Pennsylvania's 10th congressional district.",
    },
  ],
  'house-lloyd-smucker-pennsylvania-11th': [
    {
      category: 'position',
      label: 'Smucker Company',
      summary:
        '1980s-2008: Owned and operated the Smucker Company, growing it into a large construction business in Lancaster County.',
    },
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2001-2009: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'Pennsylvania State Senate',
      summary: '2009-2016: Member of the Pennsylvania State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Pennsylvania's 11th congressional district.",
    },
  ],
  'house-summer-lee-pennsylvania-12th': [
    {
      category: 'position',
      label: 'Law and organizing',
      summary:
        '2010s: Worked as an attorney and organizer on racial-justice, labor, and community issues in western Pennsylvania.',
    },
    {
      category: 'position',
      label: 'Pennsylvania House of Representatives',
      summary: '2019-2022: Member of the Pennsylvania House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Pennsylvania's 12th congressional district.",
    },
  ],
  'house-john-joyce-pennsylvania-13th': [
    {
      category: 'position',
      label: 'Navy and medical practice',
      summary:
        '1980s-2018: Served in the U.S. Navy during Desert Storm and later practiced for decades as a dermatologist in central Pennsylvania.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Pennsylvania's 13th congressional district.",
    },
  ],
  'house-guy-reschenthaler-pennsylvania-14th': [
    {
      category: 'position',
      label: 'Navy JAG and local judiciary',
      summary:
        '2000s-2015: Served in the U.S. Navy Judge Advocate General Corps, including Iraq, and later as a magisterial district judge.',
    },
    {
      category: 'position',
      label: 'Pennsylvania State Senate',
      summary: '2015-2019: Member of the Pennsylvania State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Pennsylvania's 14th congressional district.",
    },
  ],
  'house-glenn-thompson-pennsylvania-15th': [
    {
      category: 'position',
      label: 'Rehabilitation services',
      summary:
        '1980s-2008: Worked as a rehabilitation therapist manager and held local civic roles in central Pennsylvania.',
    },
    {
      category: 'position',
      label: 'Local education and party leadership',
      summary:
        '1990-1995 and 2002-2008: Served on the Bald Eagle Area school board and later chaired the Centre County Republican Party.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for Pennsylvania's 15th congressional district.",
    },
  ],
  'house-mike-kelly-pennsylvania-16th': [
    {
      category: 'position',
      label: 'Automotive business',
      summary:
        '1970s-2010: Built a long career in western Pennsylvania’s auto business and became a well-known local dealer and employer.',
    },
    {
      category: 'position',
      label: 'Local public service',
      summary:
        '1990s-2009: Served in local public roles, including school-board and county-council service in the Erie area.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Pennsylvania's 16th congressional district.",
    },
  ],
  'house-christopher-deluzio-pennsylvania-17th': [
    {
      category: 'position',
      label: 'Navy service',
      summary:
        '2000s: Served as a U.S. Navy officer, including deployments and a tour in Iraq with Army Civil Affairs.',
    },
    {
      category: 'position',
      label: 'Voting-rights and technology policy work',
      summary:
        '2010s-2022: Worked as a voting-rights attorney and policy leader, including roles at the Brennan Center and Pitt Cyber.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Pennsylvania's 17th congressional district.",
    },
  ],
  'house-diana-degette-colorado-1st': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1980s-1992: Worked as a Denver attorney before running for office.',
    },
    {
      category: 'position',
      label: 'Colorado House of Representatives',
      summary: '1993-1997: Member of the Colorado House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Colorado's 1st congressional district.",
    },
  ],
  'house-joe-neguse-colorado-2nd': [
    {
      category: 'position',
      label: 'Student and state policy work',
      summary:
        '2000s: Served in student leadership at the University of Colorado and worked in Colorado state-policy roles after law school.',
    },
    {
      category: 'position',
      label: 'University of Colorado Board of Regents',
      summary: '2008-2015: Regent of the University of Colorado.',
    },
    {
      category: 'position',
      label: 'Colorado Department of Regulatory Agencies',
      summary: '2015-2017: Executive director of the Colorado Department of Regulatory Agencies.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Colorado's 2nd congressional district.",
    },
  ],
  'house-jeff-hurd-colorado-3rd': [
    {
      category: 'position',
      label: 'Appellate clerkship and big-law practice',
      summary:
        '2000s: Clerked for Judge Timothy M. Tymkovich and practiced law at Sullivan & Cromwell in New York.',
    },
    {
      category: 'position',
      label: 'Western Colorado legal practice',
      summary:
        '2010s-2024: Built a law practice in western Colorado focused on rural clients, especially electric cooperatives and infrastructure matters.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Colorado's 3rd congressional district.",
    },
  ],
  'house-lauren-boebert-colorado-4th': [
    {
      category: 'position',
      label: 'Small business',
      summary:
        '2010s-2020: Worked in small business and became known as the owner of Shooters Grill in Rifle, Colorado.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2021-present: U.S. representative from Colorado, first for the 3rd district and now for the 4th congressional district.",
    },
  ],
  'house-jeff-crank-colorado-5th': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary: '1991-1998: Worked for Representative Joel Hefley and became his administrative director.',
    },
    {
      category: 'position',
      label: 'Advocacy, media, and nonprofit work',
      summary:
        '2000s-2024: Worked in conservative advocacy, broadcasting, and nonprofit leadership in Colorado.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Colorado's 5th congressional district.",
    },
  ],
  'house-jason-crow-colorado-6th': [
    {
      category: 'position',
      label: 'Army service',
      summary:
        '1990s-2000s: Served in the Army, including deployments with the 82nd Airborne Division and 75th Ranger Regiment to Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '2009-2018: Worked as an attorney in Colorado, including commercial-litigation and veterans-advocacy work.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Colorado's 6th congressional district.",
    },
  ],
  'house-brittany-pettersen-colorado-7th': [
    {
      category: 'position',
      label: 'Advocacy and community work',
      summary:
        '2000s-2012: Worked on mental-health, substance-use, and family-policy advocacy in Colorado.',
    },
    {
      category: 'position',
      label: 'Colorado House of Representatives',
      summary: '2013-2019: Member of the Colorado House of Representatives.',
    },
    {
      category: 'position',
      label: 'Colorado Senate',
      summary: '2019-2023: Member of the Colorado Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Colorado's 7th congressional district.",
    },
  ],
  'house-gabe-evans-colorado-8th': [
    {
      category: 'position',
      label: 'Army and National Guard service',
      summary:
        '2000s-2020s: Served in the U.S. Army and Colorado Army National Guard as a Black Hawk pilot and company commander.',
    },
    {
      category: 'position',
      label: 'Law enforcement',
      summary: '2010s-2020s: Worked as a police officer in Arvada, Colorado.',
    },
    {
      category: 'position',
      label: 'Colorado House of Representatives',
      summary: '2023-2025: Member of the Colorado House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Colorado's 8th congressional district.",
    },
  ],
  'house-tracey-mann-kansas-1st': [
    {
      category: 'position',
      label: 'Family farm and agriculture',
      summary:
        '1990s-2010: Worked in family farming and agricultural business in western Kansas.',
    },
    {
      category: 'position',
      label: 'Kansas House of Representatives',
      summary: '2011-2018: Member of the Kansas House of Representatives.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Kansas',
      summary: '2018-2019: Lieutenant governor of Kansas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Kansas's 1st congressional district.",
    },
  ],
  'house-derek-schmidt-kansas-2nd': [
    {
      category: 'position',
      label: 'Law and state policy work',
      summary:
        '1990s-2000: Worked as a lawyer and in Kansas state-government and Senate staff roles before elective office.',
    },
    {
      category: 'position',
      label: 'Kansas Senate',
      summary: '2001-2011: Member of the Kansas Senate.',
    },
    {
      category: 'position',
      label: 'Kansas attorney general',
      summary: '2011-2023: Attorney general of Kansas.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Kansas's 2nd congressional district.",
    },
  ],
  'house-sharice-davids-kansas-3rd': [
    {
      category: 'position',
      label: 'Legal, economic-development, and MMA work',
      summary:
        '2000s-2018: Worked as an attorney and in Native-community economic-development roles while also competing in mixed martial arts.',
    },
    {
      category: 'position',
      label: 'White House fellowship',
      summary: '2016-2017: White House fellow at the Department of Transportation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Kansas's 3rd congressional district.",
    },
  ],
  'house-ron-estes-kansas-4th': [
    {
      category: 'position',
      label: 'Engineering and business leadership',
      summary:
        '1980s-2004: Worked as an engineer and business executive in manufacturing and service industries.',
    },
    {
      category: 'position',
      label: 'Sedgwick County treasurer',
      summary: '2005-2011: Treasurer of Sedgwick County, Kansas.',
    },
    {
      category: 'position',
      label: 'Kansas state treasurer',
      summary: '2011-2017: Kansas state treasurer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Kansas's 4th congressional district.",
    },
  ],
  'house-wesley-bell-missouri-1st': [
    {
      category: 'position',
      label: 'Public defense and local legal roles',
      summary:
        '2000s-2015: Worked as a public defender and held municipal legal roles in St. Louis County.',
    },
    {
      category: 'position',
      label: 'Ferguson City Council',
      summary: '2015-2018: Member of the Ferguson City Council.',
    },
    {
      category: 'position',
      label: 'St. Louis County prosecuting attorney',
      summary: '2019-2025: Prosecuting attorney for St. Louis County, Missouri.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Missouri's 1st congressional district.",
    },
  ],
  'house-ann-wagner-missouri-2nd': [
    {
      category: 'position',
      label: 'Family business and political work',
      summary:
        '1980s-2005: Worked in her family business and in Republican political and party roles in Missouri and nationally.',
    },
    {
      category: 'position',
      label: 'Ambassador to Luxembourg',
      summary: '2005-2009: United States ambassador to Luxembourg.',
    },
    {
      category: 'position',
      label: 'Republican National Committee leadership',
      summary: '2009-2011: Co-chair of the Republican National Committee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Missouri's 2nd congressional district.",
    },
  ],
  'house-robert-onder-missouri-3rd': [
    {
      category: 'position',
      label: 'Medicine and law',
      summary:
        '1990s-2024: Practiced medicine in the St. Louis area while also building a legal and policy profile.',
    },
    {
      category: 'position',
      label: 'Missouri House of Representatives',
      summary: '2007-2009: Member of the Missouri House of Representatives.',
    },
    {
      category: 'position',
      label: 'Missouri Senate',
      summary: '2015-2023: Member of the Missouri Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Missouri's 3rd congressional district.",
    },
  ],
  'house-mark-alford-missouri-4th': [
    {
      category: 'position',
      label: 'Broadcasting and business',
      summary:
        '1990s-2022: Worked as a television news anchor, media personality, and small-business owner in the Kansas City area.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Missouri's 4th congressional district.",
    },
  ],
  'house-emanuel-cleaver-missouri-5th': [
    {
      category: 'position',
      label: 'Pastoral leadership',
      summary:
        '1970s-2000s: Served as a pastor and community leader in Kansas City, Missouri.',
    },
    {
      category: 'position',
      label: 'Kansas City Council',
      summary: '1979-1991: Member of the Kansas City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Kansas City',
      summary: '1991-1999: Mayor of Kansas City, Missouri.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Missouri's 5th congressional district.",
    },
  ],
  'house-sam-graves-missouri-6th': [
    {
      category: 'position',
      label: 'Farming and small business',
      summary:
        "1970s-1992: Worked in his family's farming and small-business operations in northern Missouri.",
    },
    {
      category: 'position',
      label: 'Missouri House of Representatives',
      summary: '1992-1994: Member of the Missouri House of Representatives.',
    },
    {
      category: 'position',
      label: 'Missouri Senate',
      summary: '1994-2000: Member of the Missouri Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-present: U.S. representative for Missouri's 6th congressional district.",
    },
  ],
  'house-eric-burlison-missouri-7th': [
    {
      category: 'position',
      label: 'Private-sector work',
      summary:
        '2000s-2022: Worked as an investment advisor and software consultant in southwest Missouri.',
    },
    {
      category: 'position',
      label: 'Missouri House of Representatives',
      summary: '2009-2017: Member of the Missouri House of Representatives.',
    },
    {
      category: 'position',
      label: 'Missouri Senate',
      summary: '2019-2023: Member of the Missouri Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Missouri's 7th congressional district.",
    },
  ],
  'house-jason-smith-missouri-8th': [
    {
      category: 'position',
      label: 'Business and property development',
      summary:
        '2000s: Worked in business and property development in southern Missouri after studying agriculture economics and business.',
    },
    {
      category: 'position',
      label: 'Missouri House of Representatives',
      summary:
        '2005-2013: Member of the Missouri House of Representatives, including service as majority whip and speaker pro tempore.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Missouri's 8th congressional district.",
    },
  ],
  'house-barry-moore-alabama-1st': [
    {
      category: 'position',
      label: 'Military, agriculture, and small business',
      summary:
        '1980s-2010: Served in the Alabama National Guard and Reserves, worked in the animal-health business, and built a small business in south Alabama.',
    },
    {
      category: 'position',
      label: 'Alabama House of Representatives',
      summary: '2010-2018: Member of the Alabama House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2021-present: U.S. representative from Alabama, first for the 2nd district and now for the 1st congressional district.",
    },
  ],
  'house-shomari-figures-alabama-2nd': [
    {
      category: 'position',
      label: 'Federal clerkship and Obama White House work',
      summary:
        '2010s: Worked as a federal law clerk and later in the Obama White House on presidential personnel and agency staffing.',
    },
    {
      category: 'position',
      label: 'Justice Department and congressional counsel roles',
      summary:
        '2010s-2024: Served in senior Justice Department and congressional counsel roles, including DOJ liaison and counselor to Attorney General Merrick Garland.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Alabama's 2nd congressional district.",
    },
  ],
  'house-mike-rogers-alabama-3rd': [
    {
      category: 'position',
      label: 'County government',
      summary: '1987-1990: Calhoun County commissioner in east Alabama.',
    },
    {
      category: 'position',
      label: 'Law practice and small business',
      summary: '1990s-2002: Practiced law and ran a small business in Calhoun County.',
    },
    {
      category: 'position',
      label: 'Alabama House of Representatives',
      summary: '1994-2002: Member of the Alabama House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Alabama's 3rd congressional district.",
    },
  ],
  'house-robert-aderholt-alabama-4th': [
    {
      category: 'position',
      label: 'Law practice',
      summary: 'Early 1990s: Worked as an attorney in northwest Alabama.',
    },
    {
      category: 'position',
      label: 'Haleyville municipal judge',
      summary: '1992-1996: Municipal judge in Haleyville, Alabama.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Alabama's 4th congressional district.",
    },
  ],
  'house-dale-strong-alabama-5th': [
    {
      category: 'position',
      label: 'Madison County Commission',
      summary: '1996-2012: Member of the Madison County Commission.',
    },
    {
      category: 'position',
      label: 'Chair of the Madison County Commission',
      summary: '2012-2023: Chairman of the Madison County Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Alabama's 5th congressional district.",
    },
  ],
  'house-gary-palmer-alabama-6th': [
    {
      category: 'position',
      label: 'Alabama Policy Institute',
      summary:
        '1989-2014: Cofounded and led the Alabama Policy Institute, a conservative state-policy think tank.',
    },
    {
      category: 'position',
      label: 'State-policy network leadership',
      summary:
        '1990s-2010s: Helped build national state-policy and conservative think-tank networks while remaining based in Alabama.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Alabama's 6th congressional district.",
    },
  ],
  'house-terri-sewell-alabama-7th': [
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '1990s-2010: Worked as a securities and public-finance lawyer, including at Davis Polk and Maynard, Cooper & Gale.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Alabama's 7th congressional district.",
    },
  ],
  'house-nicholas-begich-alaska-at-large': [
    {
      category: 'position',
      label: 'Technology and business work',
      summary:
        '1990s-2000s: Worked in technology, product, and business roles before building his own Alaska-based ventures.',
    },
    {
      category: 'position',
      label: 'FarShore Partners and startup mentoring',
      summary:
        '2006-2024: Founded and led FarShore Partners while mentoring early-stage companies and working in private-sector leadership roles.',
    },
    {
      category: 'position',
      label: 'Alaska policy and telecom boards',
      summary:
        '2010s-2024: Served with Alaska policy and civic organizations, including the Alaska Policy Forum and the Matanuska Telecom Association board.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Alaska's at-large congressional district.",
    },
  ],
  'house-ed-case-hawaii-1st': [
    {
      category: 'position',
      label: 'Capitol Hill and legal work',
      summary:
        '1970s-1994: Worked as a congressional aide to Spark Matsunaga and later practiced law in Honolulu for more than two decades.',
    },
    {
      category: 'position',
      label: "Hawai'i House of Representatives",
      summary: "1994-2002: Member of the Hawai'i House of Representatives, including service as majority leader.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2002-2007: U.S. representative for Hawai'i's 2nd congressional district before leaving Congress.",
    },
    {
      category: 'position',
      label: 'Outrigger Enterprises Group',
      summary:
        '2007-2018: Senior vice president and chief legal officer at Outrigger, a major Hawaii hotel and resort company.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Hawai'i's 1st congressional district.",
    },
  ],
  'house-jill-tokuda-hawaii-2nd': [
    {
      category: 'position',
      label: "Hawai'i State Senate",
      summary:
        "2006-2018: Represented Kaneohe and Kailua in the Hawai'i State Senate and chaired major committees including Ways and Means.",
    },
    {
      category: 'position',
      label: 'Nonprofit and workforce-development work',
      summary:
        '2019-2022: Worked in nonprofit and policy roles, including CyberHawaii and the Nisei Veterans Memorial Center.',
    },
    {
      category: 'position',
      label: 'State pandemic and fiscal oversight work',
      summary:
        "2020-2022: Served on Hawai'i's House Select Committee on COVID-19 Economic and Financial Preparedness.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Hawai'i's 2nd congressional district.",
    },
  ],
  'house-steve-scalise-louisiana-1st': [
    {
      category: 'position',
      label: 'Louisiana House of Representatives',
      summary: '1996-2008: Member of the Louisiana House of Representatives.',
    },
    {
      category: 'position',
      label: 'Louisiana Senate',
      summary: '2008: Member of the Louisiana Senate before moving to Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2008-present: U.S. representative for Louisiana's 1st congressional district.",
    },
  ],
  'house-troy-carter-louisiana-2nd': [
    {
      category: 'position',
      label: 'New Orleans mayoral staff',
      summary: '1980s-1991: Worked as an executive assistant in New Orleans city government.',
    },
    {
      category: 'position',
      label: 'Louisiana House of Representatives',
      summary: '1991-2006: Member of the Louisiana House of Representatives.',
    },
    {
      category: 'position',
      label: 'New Orleans City Council',
      summary: '2006-2016: Member of the New Orleans City Council.',
    },
    {
      category: 'position',
      label: 'Louisiana Senate',
      summary: '2016-2021: Member of the Louisiana Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Louisiana's 2nd congressional district.",
    },
  ],
  'house-clay-higgins-louisiana-3rd': [
    {
      category: 'position',
      label: 'Louisiana National Guard',
      summary: '1979-1985: Served in the Louisiana National Guard military police.',
    },
    {
      category: 'position',
      label: 'Local law enforcement',
      summary:
        '2004-2016: Worked in Louisiana law enforcement, including service with city police and parish sheriff offices.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Louisiana's 3rd congressional district.",
    },
  ],
  'house-mike-johnson-louisiana-4th': [
    {
      category: 'position',
      label: 'Constitutional law and conservative legal work',
      summary:
        'Late 1990s-2015: Worked as a constitutional lawyer in private practice and with the Alliance Defending Freedom.',
    },
    {
      category: 'position',
      label: 'Louisiana House of Representatives',
      summary: '2015-2017: Member of the Louisiana House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Louisiana's 4th congressional district.",
    },
  ],
  'house-julia-letlow-louisiana-5th': [
    {
      category: 'position',
      label: 'Higher-education administration',
      summary:
        '2000s-2021: Worked in university teaching, communications, and academic-administration roles at ULM and Tulane.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Louisiana's 5th congressional district.",
    },
  ],
  'house-cleo-fields-louisiana-6th': [
    {
      category: 'position',
      label: 'Louisiana Senate',
      summary: '1987-1993: Member of the Louisiana Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-1997: U.S. representative for Louisiana's 4th congressional district.",
    },
    {
      category: 'position',
      label: 'Louisiana Senate',
      summary: '1997-2012 and 2020-2025: Returned to the Louisiana Senate in multiple later stints.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Louisiana's 6th congressional district.",
    },
  ],
  'house-trent-kelly-mississippi-1st': [
    {
      category: 'position',
      label: 'Army National Guard service',
      summary:
        '1980s-2020s: Served in the Mississippi Army National Guard, rising to the rank of major general.',
    },
    {
      category: 'position',
      label: 'Law practice and prosecution',
      summary:
        '1990s-2015: Worked in private law practice and prosecutorial roles, including service as district attorney for Mississippi’s 1st Circuit.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for Mississippi's 1st congressional district.",
    },
  ],
  'house-bennie-thompson-mississippi-2nd': [
    {
      category: 'position',
      label: 'Local civil-rights and community work',
      summary:
        '1960s: Took part in civil-rights organizing in Mississippi, including work connected to Fannie Lou Hamer.',
    },
    {
      category: 'position',
      label: 'Bolton town government',
      summary: '1969-1973: Alderman in Bolton, Mississippi.',
    },
    {
      category: 'position',
      label: 'Mayor of Bolton',
      summary: '1973-1980: Mayor of Bolton, Mississippi.',
    },
    {
      category: 'position',
      label: 'Hinds County Board of Supervisors',
      summary: '1980-1993: County supervisor in Hinds County, Mississippi.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for Mississippi's 2nd congressional district.",
    },
  ],
  'house-michael-guest-mississippi-3rd': [
    {
      category: 'position',
      label: 'Assistant district attorney',
      summary: '1994-2008: Assistant district attorney for Madison and Rankin counties in Mississippi.',
    },
    {
      category: 'position',
      label: 'District attorney',
      summary: '2008-2019: District attorney for Mississippi’s 20th Circuit Court District.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Mississippi's 3rd congressional district.",
    },
  ],
  'house-mike-ezell-mississippi-4th': [
    {
      category: 'position',
      label: 'Law enforcement career',
      summary:
        '1980s-2014: Built a long law-enforcement career on the Mississippi Gulf Coast, including police leadership roles.',
    },
    {
      category: 'position',
      label: 'Sheriff of Jackson County',
      summary: '2014-2022: Sheriff of Jackson County, Mississippi.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Mississippi's 4th congressional district.",
    },
  ],
  'house-jimmy-patronis-florida-1st': [
    {
      category: 'position',
      label: 'Family business and civic roles',
      summary:
        '1990s-2006: Worked in his family restaurant business and served in local and state civic appointments in the Florida Panhandle.',
    },
    {
      category: 'position',
      label: 'Florida Elections Commission',
      summary: '1998-2003: Member of the Florida Elections Commission.',
    },
    {
      category: 'position',
      label: 'Bay County Airport Authority',
      summary: '2004-2006: Chair of the Bay County Airport Authority.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2006-2014: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Public Service Commission',
      summary: '2015-2017: Member of the Florida Public Service Commission.',
    },
    {
      category: 'position',
      label: 'Chief financial officer of Florida',
      summary: '2017-2025: Chief financial officer of Florida.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Florida's 1st congressional district.",
    },
  ],
  'house-neal-dunn-florida-2nd': [
    {
      category: 'position',
      label: 'Army medical service',
      summary:
        '1980s: Served as an Army surgeon after medical training at George Washington University and Walter Reed.',
    },
    {
      category: 'position',
      label: 'Urology practice',
      summary:
        '1990s-2016: Practiced urology in Panama City and helped build a large Florida medical practice.',
    },
    {
      category: 'position',
      label: 'Florida Medical Association leadership',
      summary: '1990s-2010s: Longtime leader on the Florida Medical Association board of governors.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Florida's 2nd congressional district.",
    },
  ],
  'house-kat-cammack-florida-3rd': [
    {
      category: 'position',
      label: 'Campaign and congressional staff work',
      summary:
        "2012-2020: Ran Ted Yoho's 2012 campaign and later served for years as deputy chief of staff in Florida's 3rd district office.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Florida's 3rd congressional district.",
    },
  ],
  'house-aaron-bean-florida-4th': [
    {
      category: 'position',
      label: 'Community banking and small business',
      summary:
        '1980s-2022: Worked as a community bank president and built several small businesses in northeast Florida.',
    },
    {
      category: 'position',
      label: 'Fernandina Beach local government',
      summary: '1990s-2000s: Served as a city commissioner and later mayor of Fernandina Beach.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2000-2008: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2012-2022: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 4th congressional district.",
    },
  ],
  'house-john-rutherford-florida-5th': [
    {
      category: 'position',
      label: "Jacksonville Sheriff's Office",
      summary: '1974-2003: Served in the Jacksonville Sheriff\'s Office, rising through patrol and corrections leadership.',
    },
    {
      category: 'position',
      label: 'Sheriff of Duval County',
      summary: '2003-2015: Sheriff of Duval County, Florida.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Florida's 5th congressional district.",
    },
  ],
  'house-randy-fine-florida-6th': [
    {
      category: 'position',
      label: 'Entrepreneurship',
      summary:
        '1990s-2016: Built a private-sector career in retail, technology, and hospitality businesses before entering politics.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2016-2024: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2024-2025: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Florida's 6th congressional district.",
    },
  ],
  'house-cory-mills-florida-7th': [
    {
      category: 'position',
      label: 'Army service',
      summary:
        '1999-2003: Served in the U.S. Army, including combat service with the 82nd Airborne Division in Iraq.',
    },
    {
      category: 'position',
      label: 'Defense contracting and security business',
      summary:
        '2005-2022: Worked as a military contractor and later built businesses focused on defense, security, and protective equipment.',
    },
    {
      category: 'position',
      label: 'Defense Business Board',
      summary: '2020-2021: Trump appointee on the Defense Business Board.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 7th congressional district.",
    },
  ],
  'house-mike-haridopolos-florida-8th': [
    {
      category: 'position',
      label: 'Teaching and academic work',
      summary:
        '1990s-2000s: Taught history and political science in Florida colleges and universities.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2000-2003: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2003-2012: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'President of the Florida Senate',
      summary: '2010-2012: President of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'Commentary and public affairs work',
      summary: '2010s-2024: Worked in media, writing, and public-affairs roles after leaving the legislature.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Florida's 8th congressional district.",
    },
  ],
  'house-darren-soto-florida-9th': [
    {
      category: 'position',
      label: 'Law practice',
      summary:
        '2005-2007: Practiced commercial, real-estate, family, and civil-rights law in central Florida.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2007-2012: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2012-2016: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Florida's 9th congressional district.",
    },
  ],
  'house-maxwell-frost-florida-10th': [
    {
      category: 'position',
      label: 'Political and community organizing',
      summary:
        '2010s: Worked on political campaigns and community organizing in Florida, including youth-voter and civil-rights work.',
    },
    {
      category: 'position',
      label: 'ACLU and gun-violence-prevention advocacy',
      summary:
        'Late 2010s-2022: Organized on voting rights and abortion rights at the ACLU and later became national organizing director for March for Our Lives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 10th congressional district.",
    },
  ],
  'house-daniel-webster-florida-11th': [
    {
      category: 'position',
      label: 'Family business',
      summary:
        '1970s-2010: Worked in and later owned the family air-conditioning and heating business in central Florida.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1980-1998: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Speaker of the Florida House',
      summary: '1996-1998: Speaker of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '1998-2008: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'Florida Senate leadership',
      summary: '2006-2008: Majority leader of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Florida's 11th congressional district.",
    },
  ],
  'house-gus-bilirakis-florida-12th': [
    {
      category: 'position',
      label: 'Law practice and local civic work',
      summary:
        '1980s-1998: Practiced law and built a civic profile in Pasco County before running for office.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1998-2006: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Florida's 12th congressional district.",
    },
  ],
  'house-anna-paulina-luna-florida-13th': [
    {
      category: 'position',
      label: 'Air Force service',
      summary:
        '2009-2014: Served in the U.S. Air Force as an airfield management specialist.',
    },
    {
      category: 'position',
      label: 'Advocacy and political campaigning',
      summary:
        '2010s-2022: Worked in conservative advocacy and ran congressional campaigns before winning office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 13th congressional district.",
    },
  ],
  'house-kathy-castor-florida-14th': [
    {
      category: 'position',
      label: 'Law practice and community advocacy',
      summary:
        '1990s-2002: Worked as an attorney and civic leader in Tampa before elected office.',
    },
    {
      category: 'position',
      label: 'Hillsborough County Commission',
      summary: '2002-2006: Member of the Hillsborough County Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Florida's 14th congressional district.",
    },
  ],
  'house-laurel-lee-florida-15th': [
    {
      category: 'position',
      label: 'Legal and federal prosecutorial work',
      summary:
        '2000s-2013: Worked as an attorney, assistant federal public defender, and assistant U.S. attorney in Florida.',
    },
    {
      category: 'position',
      label: 'Florida circuit judge',
      summary: '2013-2019: Judge on Florida\'s Thirteenth Judicial Circuit.',
    },
    {
      category: 'position',
      label: 'Florida secretary of state',
      summary: '2019-2022: Secretary of state of Florida.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 15th congressional district.",
    },
  ],
  'house-vern-buchanan-florida-16th': [
    {
      category: 'position',
      label: 'Business leadership',
      summary:
        '1970s-2006: Built a large business career in printing, auto dealerships, aviation, and other ventures.',
    },
    {
      category: 'position',
      label: 'Chamber and civic leadership',
      summary:
        '1990s-2000s: Chaired the Greater Sarasota Chamber of Commerce and the Florida Chamber of Commerce.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Florida's 16th congressional district.",
    },
  ],
  'house-w-steube-florida-17th': [
    {
      category: 'position',
      label: 'Army JAG and legal work',
      summary:
        '2000s-2010: Served in the U.S. Army JAG Corps and worked as an attorney in southwest Florida.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2010-2016: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2016-2018: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Florida's 17th congressional district.",
    },
  ],
  'house-scott-franklin-florida-18th': [
    {
      category: 'position',
      label: 'Naval aviation service',
      summary:
        '1980s-2010s: Served as a naval aviator on active duty and in the reserves, including combat and post-9/11 recalls.',
    },
    {
      category: 'position',
      label: 'Insurance and business leadership',
      summary:
        '2000s-2020: Built a business career in insurance and risk management in central Florida.',
    },
    {
      category: 'position',
      label: 'Lakeland City Commission',
      summary: '2017-2021: Member of the Lakeland City Commission, including service as mayor pro tempore.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Florida's 18th congressional district.",
    },
  ],
  'house-byron-donalds-florida-19th': [
    {
      category: 'position',
      label: 'Finance and banking work',
      summary:
        '2000s-2016: Worked in banking, insurance, and financial-services roles in southwest Florida.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2016-2020: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Florida's 19th congressional district.",
    },
  ],
  'house-sheila-cherfilus-mccormick-florida-20th': [
    {
      category: 'position',
      label: 'Health-care business leadership',
      summary:
        '1999-2022: Worked in executive roles at Trinity Health Care Services and related South Florida health-care businesses.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2022-present: U.S. representative for Florida's 20th congressional district.",
    },
  ],
  'house-brian-mast-florida-21st': [
    {
      category: 'position',
      label: 'Army service',
      summary:
        '2000-2011: Served in the Army Reserve and later the U.S. Army, becoming an explosive ordnance disposal technician and losing both legs in Afghanistan.',
    },
    {
      category: 'position',
      label: 'Federal counterterrorism and explosives work',
      summary:
        '2011-2016: Held explosives and counterterrorism roles with federal agencies including DHS, NNSA, and ATF.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for Florida's 21st congressional district.",
    },
  ],
  'house-lois-frankel-florida-22nd': [
    {
      category: 'position',
      label: 'Teaching and legal work',
      summary:
        '1970s-1986: Worked in education and legal roles in Florida before entering elected office.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1986-1992 and 1994-2002: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Mayor of West Palm Beach',
      summary: '2003-2011: Mayor of West Palm Beach, Florida.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Florida's 22nd congressional district.",
    },
  ],
  'house-jared-moskowitz-florida-23rd': [
    {
      category: 'position',
      label: 'Parkland City Commission',
      summary: '2006-2012: Member of the Parkland City Commission.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '2012-2019: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Division of Emergency Management',
      summary: '2019-2021: Director of the Florida Division of Emergency Management.',
    },
    {
      category: 'position',
      label: 'Broward County Commission',
      summary: '2022-2023: Member of the Broward County Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Florida's 23rd congressional district.",
    },
  ],
  'house-frederica-wilson-florida-24th': [
    {
      category: 'position',
      label: 'Education and school leadership',
      summary:
        '1970s-1992: Worked as a teacher, school principal, and Head Start education leader in Miami-Dade County.',
    },
    {
      category: 'position',
      label: 'Miami-Dade County School Board',
      summary: '1992-1998: Member of the Miami-Dade County School Board.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1998-2002: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2002-2010: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-present: U.S. representative for Florida's 24th congressional district.",
    },
  ],
  'house-debbie-wasserman-schultz-florida-25th': [
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1992-2000: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '2000-2004: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Florida's 25th congressional district.",
    },
    {
      category: 'position',
      label: 'Democratic National Committee',
      summary: '2011-2016: Chair of the Democratic National Committee.',
    },
  ],
  'house-mario-diaz-balart-florida-26th': [
    {
      category: 'position',
      label: 'Miami mayoral staff',
      summary: '1985-1988: Worked as an aide to Miami Mayor Xavier Suarez.',
    },
    {
      category: 'position',
      label: 'Florida House of Representatives',
      summary: '1988-1992 and 2000-2002: Member of the Florida House of Representatives.',
    },
    {
      category: 'position',
      label: 'Florida Senate',
      summary: '1992-2000: Member of the Florida Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Florida's 26th congressional district.",
    },
  ],
  'house-maria-salazar-florida-27th': [
    {
      category: 'position',
      label: 'Spanish-language journalism',
      summary:
        '1980s-2020: Built a long career as a television journalist, interviewer, and political host at Telemundo and other Spanish-language outlets.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Florida's 27th congressional district.",
    },
  ],
  'house-carlos-gimenez-florida-28th': [
    {
      category: 'position',
      label: 'Miami Fire-Rescue',
      summary:
        '1970s-2000: Career firefighter-paramedic who rose to become chief of the Miami Fire-Rescue Department.',
    },
    {
      category: 'position',
      label: 'Miami city manager',
      summary: '2000-2003: City manager of Miami.',
    },
    {
      category: 'position',
      label: 'Miami-Dade County Commission',
      summary: '2004-2011: Member of the Miami-Dade County Commission.',
    },
    {
      category: 'position',
      label: 'Mayor of Miami-Dade County',
      summary: '2011-2020: Mayor of Miami-Dade County.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Florida's 28th congressional district.",
    },
  ],
  'house-russ-fulcher-idaho-1st': [
    {
      category: 'position',
      label: 'High-technology industry',
      summary:
        '1980s-2000s: Spent 24 years in the high-technology industry, including work at Micron Technology and Preco Electronics.',
    },
    {
      category: 'position',
      label: 'Idaho Senate',
      summary: '2005-2014: Member of the Idaho Senate, including years as majority caucus chair.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for Idaho's 1st congressional district.",
    },
  ],
  'house-michael-simpson-idaho-2nd': [
    {
      category: 'position',
      label: 'Dentistry',
      summary: "1970s-1980: Dentist at his family's dental practice in Blackfoot after dental school.",
    },
    {
      category: 'position',
      label: 'Blackfoot City Council',
      summary: '1980-1984: Member of the Blackfoot City Council.',
    },
    {
      category: 'position',
      label: 'Idaho House of Representatives',
      summary: '1984-1998: Member of the Idaho House of Representatives, including service as speaker from 1992 to 1998.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1999-present: U.S. representative for Idaho's 2nd congressional district.",
    },
  ],
  'house-ryan-zinke-montana-1st': [
    {
      category: 'position',
      label: 'U.S. Navy and Navy SEALs',
      summary:
        '1985-2008: Navy officer and SEAL commander, with deployments in special-operations roles before retiring from active duty.',
    },
    {
      category: 'position',
      label: 'Montana State Senate',
      summary: '2009-2011: Member of the Montana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-2017: U.S. representative for Montana's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'Secretary of the Interior',
      summary: '2017-2019: U.S. secretary of the Interior.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Montana's 1st congressional district.",
    },
  ],
  'house-troy-downing-montana-2nd': [
    {
      category: 'position',
      label: 'Teaching and technology entrepreneurship',
      summary:
        '1990s-2001: Worked as a research scientist and teacher at NYU before founding a technology startup that later merged with Yahoo.',
    },
    {
      category: 'position',
      label: 'U.S. Air Force and Air National Guard',
      summary:
        '2001-2009: Served in the Air Force and Air National Guard, including two tours in Afghanistan with a combat search-and-rescue squadron.',
    },
    {
      category: 'position',
      label: 'Business ventures',
      summary:
        '2010s: Returned to the private sector and built businesses including an insurance company and a commercial real-estate firm.',
    },
    {
      category: 'position',
      label: 'Montana State Auditor',
      summary: '2021-2025: Montana state auditor and ex officio insurance and securities commissioner.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Montana's 2nd congressional district.",
    },
  ],
  'house-suzanne-bonamici-oregon-1st': [
    {
      category: 'position',
      label: 'Legal aid and consumer protection law',
      summary:
        '1980s-1990s: Worked at Lane County Legal Aid during college and law school and later served as an attorney at the Federal Trade Commission.',
    },
    {
      category: 'position',
      label: 'Private law practice',
      summary: '1990s-2000s: Practiced law in Portland, representing individuals and small businesses.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2007-2008: Member of the Oregon House of Representatives.',
    },
    {
      category: 'position',
      label: 'Oregon State Senate',
      summary: '2008-2011: Member of the Oregon State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2012-present: U.S. representative for Oregon's 1st congressional district.",
    },
  ],
  'house-cliff-bentz-oregon-2nd': [
    {
      category: 'position',
      label: 'Law practice and water-law work',
      summary:
        '1977-2008: Attorney in Ontario, Oregon, specializing in ranch reorganizations and water-law matters, alongside extensive civic board service.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2008-2018: Member of the Oregon House of Representatives.',
    },
    {
      category: 'position',
      label: 'Oregon State Senate',
      summary: '2018-2020: Member of the Oregon State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Oregon's 2nd congressional district.",
    },
  ],
  'house-maxine-dexter-oregon-3rd': [
    {
      category: 'position',
      label: 'Pulmonary and critical-care medicine',
      summary:
        '2000s-2020: Practiced for more than 15 years as a lung and critical-care physician at Kaiser Permanente and held physician-group leadership roles.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2020-2024: Member of the Oregon House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Oregon's 3rd congressional district.",
    },
  ],
  'house-val-hoyle-oregon-4th': [
    {
      category: 'position',
      label: 'Bicycle industry',
      summary:
        '1980s-2000s: Spent 25 years working in the international bicycle industry across retail management, manufacturing distribution, and trade.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2011-2017: Member of the Oregon House of Representatives, later serving as majority leader.',
    },
    {
      category: 'position',
      label: 'Oregon labor commissioner',
      summary: "2019-2023: Oregon labor commissioner, leading the state's Bureau of Labor and Industries.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Oregon's 4th congressional district.",
    },
  ],
  'house-janelle-bynum-oregon-5th': [
    {
      category: 'position',
      label: 'Engineering and business leadership',
      summary:
        '2000s-2010s: Built a career in engineering and business, later becoming a small-business owner in the Portland-area.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2017-2025: Member of the Oregon House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Oregon's 5th congressional district.",
    },
  ],
  'house-andrea-salinas-oregon-6th': [
    {
      category: 'position',
      label: 'Congressional and district staff work',
      summary:
        '2000s: Worked as a congressional aide and policy advisor in Washington and later as a district aide for Representative Darlene Hooley.',
    },
    {
      category: 'position',
      label: 'Oregon advocacy work',
      summary:
        '2000s-2010s: Advocated in Oregon for labor unions, environmental groups, and reproductive-rights organizations.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '2017-2022: Member of the Oregon House of Representatives, including service as majority whip and chair of the House Health Care Committee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Oregon's 6th congressional district.",
    },
  ],
  'house-harriet-hageman-wyoming-at-large': [
    {
      category: 'position',
      label: 'Trial law and natural-resources litigation',
      summary:
        '1980s-2022: Built a long career as a Wyoming trial lawyer, known for cases involving water rights, property rights, federal land use, and agency power.',
    },
    {
      category: 'position',
      label: 'Conservative legal advocacy',
      summary:
        '2000s-2020s: Became a prominent conservative legal voice in Wyoming and national disputes over federal regulation and natural-resource policy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Wyoming's at-large congressional district.",
    },
  ],
  'house-yvette-clarke-new-york-9th': [
    {
      category: 'position',
      label: 'Community, health-care, and technology work',
      summary:
        '1990s-2001: Worked in Brooklyn community, health-care, and technology roles before elected office.',
    },
    {
      category: 'position',
      label: 'New York City Council',
      summary: '2002-2006: Member of the New York City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2007-present: U.S. representative for Brooklyn-based districts, now New York's 9th congressional district.",
    },
  ],
  'house-adriano-espaillat-new-york-13th': [
    {
      category: 'position',
      label: 'Community and nonprofit leadership',
      summary:
        '1980s-1990s: Worked in community organizing and nonprofit leadership in northern Manhattan after immigrating from the Dominican Republic.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1996-2010: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'New York State Senate',
      summary: '2011-2016: Member of the New York State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for New York's 13th congressional district.",
    },
  ],
  'house-andrew-garbarino-new-york-2nd': [
    {
      category: 'position',
      label: 'Law and local civic work',
      summary: '2000s-2012: Attorney and local civic figure on Long Island before state office.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2013-2020: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for New York's 2nd congressional district.",
    },
  ],
  'house-laura-gillen-new-york-4th': [
    {
      category: 'position',
      label: 'Law practice and local civic work',
      summary: '1990s-2017: Attorney in private practice and local civic work on Long Island.',
    },
    {
      category: 'position',
      label: 'Town of Hempstead',
      summary: '2018-2020: Town supervisor of Hempstead, New York.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New York's 4th congressional district.",
    },
  ],
  'house-daniel-goldman-new-york-10th': [
    {
      category: 'position',
      label: 'Federal prosecution and legal practice',
      summary:
        '2000s-2019: Attorney and federal prosecutor, including a decade as an assistant U.S. attorney in the Southern District of New York.',
    },
    {
      category: 'position',
      label: 'First Trump impeachment inquiry',
      summary:
        '2019-2020: Lead counsel in the first Trump impeachment inquiry and part of the House impeachment trial team.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New York's 10th congressional district.",
    },
  ],
  'house-hakeem-jeffries-new-york-8th': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1990s-2006: Corporate lawyer and community-focused attorney in Brooklyn before elected office.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2007-2012: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for New York's 8th congressional district.",
    },
    {
      category: 'position',
      label: 'House Democratic leadership',
      summary:
        '2019-present: Senior House Democratic leader, including service as caucus chair and later House Democratic leader.',
    },
  ],
  'house-timothy-kennedy-new-york-26th': [
    {
      category: 'position',
      label: 'Labor and local public service',
      summary: '2000s: Worked in labor and local public-service roles in the Buffalo and Erie County area.',
    },
    {
      category: 'position',
      label: 'New York State Senate',
      summary: '2011-2024: Member of the New York State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2024-present: U.S. representative for New York's 26th congressional district.",
    },
  ],
  'house-nick-lalota-new-york-1st': [
    {
      category: 'position',
      label: 'U.S. Navy',
      summary:
        '2000s: Naval Academy graduate and Navy officer, serving overseas on multiple deployments before returning to Long Island.',
    },
    {
      category: 'position',
      label: 'Suffolk County government',
      summary:
        '2010s-2022: Held Long Island local-government roles including Suffolk County Board of Elections commissioner and chief of staff to the Suffolk County Legislature.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New York's 1st congressional district.",
    },
  ],
  'house-nicholas-langworthy-new-york-23rd': [
    {
      category: 'position',
      label: 'Congressional district-office work',
      summary:
        '2000s: Began his public career in the district office of Representative Tom Reynolds, building a constituent-services operation.',
    },
    {
      category: 'position',
      label: 'Republican Party leadership',
      summary:
        '2010-2023: Chairman of the Erie County Republican Committee and later chair of the New York Republican State Committee.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New York's 23rd congressional district.",
    },
  ],
  'house-george-latimer-new-york-16th': [
    {
      category: 'position',
      label: 'Westchester local government',
      summary:
        '1980s-2004: Served in local Westchester government, including the Rye City Council and Westchester County Board of Legislators.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2005-2012: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'New York State Senate',
      summary: '2013-2017: Member of the New York State Senate.',
    },
    {
      category: 'position',
      label: 'Westchester County executive',
      summary: '2018-2024: Westchester County executive.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New York's 16th congressional district.",
    },
  ],
  'house-michael-lawler-new-york-17th': [
    {
      category: 'position',
      label: 'Political and government-affairs work',
      summary: '2010s: Worked as a political aide and in private-sector government-affairs roles in New York.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2021-2022: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for New York's 17th congressional district.",
    },
  ],
  'house-nicole-malliotakis-new-york-11th': [
    {
      category: 'position',
      label: 'Local public-affairs work',
      summary: '2000s: Worked in local public-affairs and community roles on Staten Island before state office.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2011-2020: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for New York's 11th congressional district.",
    },
  ],
  'house-john-mannion-new-york-22nd': [
    {
      category: 'position',
      label: 'Teaching and union leadership',
      summary: '1990s-2020: High school biology teacher and union leader in central New York.',
    },
    {
      category: 'position',
      label: 'New York State Senate',
      summary: '2021-2024: Member of the New York State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New York's 22nd congressional district.",
    },
  ],
  'house-gregory-meeks-new-york-5th': [
    {
      category: 'position',
      label: 'Queens district attorney and counsel roles',
      summary: "1978-1985: Assistant district attorney and later general counsel in Queens public-service roles.",
    },
    {
      category: 'position',
      label: 'New York judiciary',
      summary: '1985-1992: Served as a New York State judge.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1992-1998: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1998-present: U.S. representative for New York's 5th congressional district.",
    },
  ],
  'house-grace-meng-new-york-6th': [
    {
      category: 'position',
      label: 'Law and Queens community work',
      summary: '2000s: Public-interest lawyer and Queens community advocate before elected office.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2009-2012: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for New York's 6th congressional district.",
    },
  ],
  'house-joseph-morelle-new-york-25th': [
    {
      category: 'position',
      label: 'Rochester-area local office',
      summary: '1980s-1990: Served in local Rochester-area politics, including Monroe County legislative work.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1991-2018: Member of the New York State Assembly, including service as majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2018-present: U.S. representative for New York's 25th congressional district.",
    },
  ],
  'house-jerrold-nadler-new-york-12th': [
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1977-1992: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1992-present: U.S. representative for Manhattan-based districts, now New York's 12th congressional district.",
    },
  ],
  'house-alexandria-ocasio-cortez-new-york-14th': [
    {
      category: 'position',
      label: 'Grassroots organizing and service work',
      summary:
        "2010s: Worked in community organizing and restaurant jobs in the Bronx and Queens, including organizing on Bernie Sanders's 2016 campaign.",
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-present: U.S. representative for New York's 14th congressional district.",
    },
  ],
  'house-josh-riley-new-york-19th': [
    {
      category: 'position',
      label: 'Labor and legal policy work',
      summary:
        '2000s-2010s: Worked as a policy analyst at the U.S. Department of Labor and later as an attorney in public-interest and private legal work.',
    },
    {
      category: 'position',
      label: 'U.S. Senate Judiciary Committee',
      summary:
        '2010s-2020s: Served as counsel on the U.S. Senate Judiciary Committee, working on antitrust, worker protection, and opioid legislation.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for New York's 19th congressional district.",
    },
  ],
  'house-patrick-ryan-new-york-18th': [
    {
      category: 'position',
      label: 'Army service and business',
      summary:
        '2000s-2010s: Army intelligence officer with two combat tours in Iraq, followed by technology and business work after military service.',
    },
    {
      category: 'position',
      label: 'Ulster County executive',
      summary: '2019-2022: Ulster County executive.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2022-present: U.S. representative for New York's 18th congressional district.",
    },
  ],
  'house-elise-stefanik-new-york-21st': [
    {
      category: 'position',
      label: 'White House and campaign policy roles',
      summary:
        '2000s: Worked in the George W. Bush White House and in Republican campaign and policy roles after Harvard.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for New York's 21st congressional district.",
    },
    {
      category: 'position',
      label: 'House Republican leadership',
      summary: '2021-present: Senior House Republican leader, including service as conference chair.',
    },
  ],
  'house-thomas-r-suozzi-new-york-3rd': [
    {
      category: 'position',
      label: 'Law and local civic work',
      summary: '1980s-1993: Attorney and local civic figure on Long Island before becoming mayor.',
    },
    {
      category: 'position',
      label: 'Mayor of Glen Cove',
      summary: '1994-2001: Mayor of Glen Cove, New York.',
    },
    {
      category: 'position',
      label: 'Nassau County executive',
      summary: '2002-2009: Nassau County executive.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2023 and 2024-present: U.S. representative for New York's 3rd congressional district.",
    },
  ],
  'house-claudia-tenney-new-york-24th': [
    {
      category: 'position',
      label: 'Law and family media business',
      summary:
        '1980s-2010: Attorney and business leader in her family-owned newspaper and publishing business in central New York.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '2011-2016: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2019 and 2021-present: U.S. representative for New York's 24th congressional district.",
    },
  ],
  'house-paul-tonko-new-york-20th': [
    {
      category: 'position',
      label: 'Amsterdam Common Council',
      summary: '1976-1983: Member of the Amsterdam Common Council in upstate New York.',
    },
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1983-2007: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'New York energy authority',
      summary: '2007-2008: President and chief executive of the New York State Energy Research and Development Authority.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for New York's 20th congressional district.",
    },
  ],
  'house-ritchie-torres-new-york-15th': [
    {
      category: 'position',
      label: 'Housing activism and community work',
      summary: '2000s-2013: Built a public profile through housing activism and community work in the Bronx.',
    },
    {
      category: 'position',
      label: 'New York City Council',
      summary: '2014-2020: Member of the New York City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for New York's 15th congressional district.",
    },
  ],
  'house-nydia-velazquez-new-york-7th': [
    {
      category: 'position',
      label: 'Community and public-administration work',
      summary:
        '1980s: Worked in New York City public-administration and community roles focused on Puerto Rican and immigrant affairs.',
    },
    {
      category: 'position',
      label: 'New York City Council',
      summary: '1984-1992: Member of the New York City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for New York's 7th congressional district.",
    },
  ],
  'house-troy-balderson-ohio-12th': [
    {
      category: 'position',
      label: 'Family business and local work',
      summary:
        '1980s-2008: Worked on the family farm and helped run the service department of his family-owned business in Muskingum County.',
    },
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary: '2009-2011: Member of the Ohio House of Representatives.',
    },
    {
      category: 'position',
      label: 'Ohio Senate',
      summary: '2011-2018: Member of the Ohio Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2018-present: U.S. representative for Ohio's 12th congressional district.",
    },
  ],
  'house-joyce-beatty-ohio-3rd': [
    {
      category: 'position',
      label: 'Education and financial-services leadership',
      summary:
        '1970s-1998: Worked in higher education, counseling, and financial-services leadership in Ohio before state office.',
    },
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary:
        '1999-2008: Member of the Ohio House of Representatives, later becoming the first female Democratic leader in chamber history.',
    },
    {
      category: 'position',
      label: 'Ohio State University',
      summary: '2008-2012: Senior vice president for outreach and engagement at Ohio State University.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Ohio's 3rd congressional district.",
    },
  ],
  'house-shontel-brown-ohio-11th': [
    {
      category: 'position',
      label: 'Marketing and small business',
      summary:
        '2000s-2011: Worked in marketing and founded a Northeast Ohio technology-solutions small business before elected office.',
    },
    {
      category: 'position',
      label: 'Warrensville Heights City Council',
      summary: '2012-2014: Member of the Warrensville Heights City Council.',
    },
    {
      category: 'position',
      label: 'Cuyahoga County Council',
      summary: '2015-2021: Member of the Cuyahoga County Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Ohio's 11th congressional district.",
    },
  ],
  'house-mike-carey-ohio-15th': [
    {
      category: 'position',
      label: 'Military service',
      summary:
        '1990s: ROTC-trained military officer while completing college, following a family tradition of service.',
    },
    {
      category: 'position',
      label: 'Energy-industry executive',
      summary:
        '1990s-2021: Energy-company executive and coal-industry advocate in Ohio, including work on miners’ pensions and energy policy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for Ohio's 15th congressional district.",
    },
  ],
  'house-warren-davidson-ohio-8th': [
    {
      category: 'position',
      label: 'Army service',
      summary:
        'Late 1980s-1990s: Served in the Army as an enlisted soldier and later officer, with assignments including the Old Guard, the Rangers, and the 101st Airborne.',
    },
    {
      category: 'position',
      label: 'Manufacturing business',
      summary: '2000s-2016: Owned and operated manufacturing companies in Ohio after earning an MBA.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2016-present: U.S. representative for Ohio's 8th congressional district.",
    },
  ],
  'house-jim-jordan-ohio-4th': [
    {
      category: 'position',
      label: 'Wrestling and education',
      summary:
        '1980s-1994: Built his early career around competitive wrestling, coaching, and education before entering politics.',
    },
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary: '1995-2000: Member of the Ohio House of Representatives.',
    },
    {
      category: 'position',
      label: 'Ohio Senate',
      summary: '2001-2006: Member of the Ohio Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Ohio's 4th congressional district.",
    },
  ],
  'house-david-joyce-ohio-14th': [
    {
      category: 'position',
      label: 'Public defense',
      summary: '1980s: Worked as a public defender after law school.',
    },
    {
      category: 'position',
      label: 'Geauga County prosecutor',
      summary: '1988-2012: Prosecutor of Geauga County, Ohio.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for Ohio's 14th congressional district.",
    },
  ],
  'house-marcy-kaptur-ohio-9th': [
    {
      category: 'position',
      label: 'Urban planning',
      summary: '1960s-1970s: Worked as a city and regional planner in Toledo and Chicago.',
    },
    {
      category: 'position',
      label: 'Carter administration',
      summary: 'Late 1970s: Domestic-policy advisor on urban affairs in the Carter administration.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1983-present: U.S. representative for Ohio's 9th congressional district.",
    },
  ],
  'house-greg-landsman-ohio-1st': [
    {
      category: 'position',
      label: 'Teaching and children-and-families advocacy',
      summary:
        '2000s-2017: Teacher and Cincinnati-area advocate for children, families, and school reform before elected office.',
    },
    {
      category: 'position',
      label: 'Cincinnati City Council',
      summary: '2018-2022: Member of the Cincinnati City Council.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Ohio's 1st congressional district.",
    },
  ],
  'house-robert-latta-ohio-5th': [
    {
      category: 'position',
      label: 'Wood County commissioner',
      summary: '1991-1996: Commissioner in Wood County, Ohio.',
    },
    {
      category: 'position',
      label: 'Ohio Senate',
      summary: '1997-2000: Member of the Ohio Senate.',
    },
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary: '2001-2007: Member of the Ohio House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-present: U.S. representative for Ohio's 5th congressional district.",
    },
  ],
  'house-max-miller-ohio-7th': [
    {
      category: 'position',
      label: 'Marine Corps Reserve',
      summary: '2013-2019: Served in the U.S. Marine Corps Reserve.',
    },
    {
      category: 'position',
      label: 'Trump administration roles',
      summary:
        '2017-2020: Held political and personnel roles in the first Trump administration, including work at Treasury and the White House.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Ohio's 7th congressional district.",
    },
  ],
  'house-michael-a-rulli-ohio-6th': [
    {
      category: 'position',
      label: 'Family business and school board service',
      summary:
        '1990s-2018: Worked in and helped lead the family grocery business, while also serving for years on the Leetonia school board.',
    },
    {
      category: 'position',
      label: 'Ohio Senate',
      summary: '2019-2024: Member of the Ohio Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2024-present: U.S. representative for Ohio's 6th congressional district.",
    },
  ],
  'house-emilia-sykes-ohio-13th': [
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary: '2015-2022: Member of the Ohio House of Representatives.',
    },
    {
      category: 'position',
      label: 'House minority leadership',
      summary: '2019-2022: Minority leader of the Ohio House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2023-present: U.S. representative for Ohio's 13th congressional district.",
    },
  ],
  'house-david-taylor-ohio-2nd': [
    {
      category: 'position',
      label: 'Clermont County prosecutor',
      summary: '1990s-2000s: Prosecutor in Clermont County, trying criminal cases in his home region.',
    },
    {
      category: 'position',
      label: 'Family small business',
      summary: '2000s-2024: Returned to and later led the family small business in Ohio.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for Ohio's 2nd congressional district.",
    },
  ],
  'house-michael-turner-ohio-10th': [
    {
      category: 'position',
      label: 'Law practice',
      summary: '1980s-1993: Lawyer and business legal advisor in the Dayton area before elected office.',
    },
    {
      category: 'position',
      label: 'Mayor of Dayton',
      summary: '1994-2002: Mayor of Dayton, Ohio.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-present: U.S. representative for Dayton-area districts, now Ohio's 10th congressional district.",
    },
    {
      category: 'position',
      label: 'National-security leadership',
      summary:
        '2010s-2020s: Senior House national-security figure, including leadership roles with the NATO Parliamentary Assembly and the House Intelligence Committee.',
    },
  ],
  'house-carol-miller-west-virginia-1st': [
    {
      category: 'position',
      label: 'Education, farming, and real estate',
      summary:
        '1980s-2006: Worked as an educator, farmer, and real-estate manager in the Huntington area before legislative office.',
    },
    {
      category: 'position',
      label: 'West Virginia House of Delegates',
      summary:
        '2006-2018: Member of the West Virginia House of Delegates, later becoming the chamber’s first female majority whip.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary:
        "2019-present: U.S. representative for southern West Virginia districts, now West Virginia's 1st congressional district.",
    },
  ],
  'house-riley-moore-west-virginia-2nd': [
    {
      category: 'position',
      label: 'Trades, congressional, and private-sector work',
      summary:
        '2000s-2016: Worked as a welder, congressional foreign-affairs staffer, and later in lobbying and private-sector roles.',
    },
    {
      category: 'position',
      label: 'West Virginia House of Delegates',
      summary: '2017-2019: Member of the West Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'West Virginia state treasurer',
      summary: '2021-2025: Treasurer of West Virginia.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for West Virginia's 2nd congressional district.",
    },
  ],
  'house-laura-friedman-california-30th': [
    {
      category: 'position',
      label: 'Film, television, and civic work',
      summary:
        '1990s-2009: Worked in film and television production and writing before moving into local public service in Glendale.',
    },
    {
      category: 'position',
      label: 'Glendale City Council',
      summary:
        '2009-2016: Member of the Glendale City Council, including service as mayor.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2016-2024: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2025-present: U.S. representative for California's 30th congressional district.",
    },
  ],
  'house-norma-torres-california-35th': [
    {
      category: 'position',
      label: '911 dispatcher and labor leadership',
      summary:
        '1980s-2000: Worked as a 911 dispatcher and later became active in public-safety union leadership.',
    },
    {
      category: 'position',
      label: 'Pomona City Council',
      summary: '2000-2006: Member of the Pomona City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Pomona',
      summary: '2006-2008: Mayor of Pomona, California.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2008-2013: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2013-2014: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for California's 35th congressional district.",
    },
  ],
  'house-ami-bera-california-6th': [
    {
      category: 'position',
      label: 'Medical practice and public health',
      summary:
        '1990s-2004: Practiced medicine and worked in public health in the Sacramento area.',
    },
    {
      category: 'position',
      label: 'Sacramento County chief medical officer',
      summary: '1999-2004: Chief medical officer for Sacramento County.',
    },
    {
      category: 'position',
      label: 'UC Davis School of Medicine',
      summary:
        '2004-2012: Associate dean and professor at the UC Davis School of Medicine.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 6th congressional district.",
    },
  ],
  'house-salud-carbajal-california-24th': [
    {
      category: 'position',
      label: 'Marine Corps Reserve and local public service',
      summary:
        '1980s-2004: Served in the Marine Corps Reserve and held local public-service and community roles in Santa Barbara County.',
    },
    {
      category: 'position',
      label: 'Santa Barbara County Board of Supervisors',
      summary: '2004-2016: Member of the Santa Barbara County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 24th congressional district.",
    },
  ],
  'house-jared-huffman-california-2nd': [
    {
      category: 'position',
      label: 'Environmental law',
      summary:
        '1990s-2006: Environmental lawyer, including a long stint with the Natural Resources Defense Council.',
    },
    {
      category: 'position',
      label: 'Marin Municipal Water District',
      summary: '2001-2006: Member of the Marin Municipal Water District board.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2006-2012: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 2nd congressional district.",
    },
  ],
  'house-young-kim-california-40th': [
    {
      category: 'position',
      label: 'Family business and community work',
      summary:
        '1980s-1993: Worked in family business and Korean American community organizations in Southern California.',
    },
    {
      category: 'position',
      label: 'Congressional staff',
      summary:
        '1993-2014: Senior community and outreach staffer for Representative Ed Royce.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2014-2016: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2021-present: U.S. representative for California's 40th congressional district.",
    },
  ],
  'house-juan-vargas-california-52nd': [
    {
      category: 'position',
      label: 'Jesuit service, law, and community work',
      summary:
        '1980s-1993: Served as a Jesuit volunteer, trained as a lawyer, and worked in community and public-affairs roles in San Diego.',
    },
    {
      category: 'position',
      label: 'San Diego City Council',
      summary: '1993-2000: Member of the San Diego City Council.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2000-2006: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2010-2012: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 52nd congressional district.",
    },
  ],
  'house-mark-takano-california-39th': [
    {
      category: 'position',
      label: 'Public school teacher',
      summary:
        '1990-2012: Taught in the Rialto Unified School District during a long classroom career.',
    },
    {
      category: 'position',
      label: 'Riverside Community College District board',
      summary:
        '1990-2012: Member of the Riverside Community College District board of trustees.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 39th congressional district.",
    },
  ],
  'house-scott-peters-california-50th': [
    {
      category: 'position',
      label: 'Environmental law and business work',
      summary:
        '1980s-2000: Worked as an environmental lawyer and in private-sector business roles before elected office.',
    },
    {
      category: 'position',
      label: 'San Diego City Council',
      summary:
        '2000-2008: Member of the San Diego City Council, including service as council president.',
    },
    {
      category: 'position',
      label: 'Port of San Diego',
      summary: '2009-2012: Commissioner on the Port of San Diego board.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 50th congressional district.",
    },
  ],
  'house-j-correa-california-46th': [
    {
      category: 'position',
      label: 'Business, teaching, and community work',
      summary:
        '1980s-1998: Worked in business and education and became active in Orange County civic life.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '1998-2004: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'Orange County Board of Supervisors',
      summary: '2005-2006: Member of the Orange County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2006-2014: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-present: U.S. representative for California's 46th congressional district.",
    },
  ],
  'house-tom-mcclintock-california-5th': [
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '1982-1992: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'State Board of Equalization',
      summary: '1993-1995: Member of the California State Board of Equalization.',
    },
    {
      category: 'position',
      label: 'California State Assembly return',
      summary: '1996-2000: Returned to the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2000-2008: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for California's 5th congressional district.",
    },
  ],
  'house-brad-sherman-california-32nd': [
    {
      category: 'position',
      label: 'Tax law, accounting, and business work',
      summary:
        '1970s-1991: Worked as a tax-law specialist, accountant, and business educator before statewide office.',
    },
    {
      category: 'position',
      label: 'State Board of Equalization',
      summary: '1991-1996: Member of the California State Board of Equalization.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-present: U.S. representative for Los Angeles-area districts, now California's 32nd congressional district.",
    },
  ],
  'house-darrell-issa-california-48th': [
    {
      category: 'position',
      label: 'United States Army',
      summary:
        '1970s: Served in the U.S. Army before moving into the private sector.',
    },
    {
      category: 'position',
      label: 'Directed Electronics',
      summary:
        '1980s-1990s: Built a major car-security and consumer-electronics business centered on the Viper alarm brand.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-2019: U.S. representative for San Diego-area districts.",
    },
    {
      category: 'position',
      label: 'U.S. representative return',
      summary: "2021-present: U.S. representative for California's 48th congressional district.",
    },
  ],
  'house-judy-chu-california-28th': [
    {
      category: 'position',
      label: 'Education and school-board leadership',
      summary:
        '1970s-1988: Community-college educator and local school-board leader in the San Gabriel Valley.',
    },
    {
      category: 'position',
      label: 'Monterey Park City Council',
      summary:
        '1988-2001: Member of the Monterey Park City Council, including multiple terms as mayor.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2001-2006: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'State Board of Equalization',
      summary: '2007-2009: Member of the California State Board of Equalization.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for California's 28th congressional district.",
    },
  ],
  'house-ken-calvert-california-41st': [
    {
      category: 'position',
      label: 'Restaurant, real estate, and local politics',
      summary:
        '1970s-1992: Worked in restaurant and real-estate business and became active in Riverside County Republican politics.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-present: U.S. representative for Inland Empire districts, now California's 41st congressional district.",
    },
  ],
  'house-jim-costa-california-21st': [
    {
      category: 'position',
      label: 'Family farming and local agricultural work',
      summary:
        '1970s: Worked in his family farming business and in Central Valley agriculture-related public affairs.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '1978-1994: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '1994-2002: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for Central Valley districts, now California's 21st congressional district.",
    },
  ],
  'house-julia-brownley-california-26th': [
    {
      category: 'position',
      label: 'Marketing, nonprofit, and school-board work',
      summary:
        '1980s-2006: Worked in marketing and nonprofit roles and later served in local education governance.',
    },
    {
      category: 'position',
      label: 'Santa Monica-Malibu school board',
      summary:
        '1994-2006: Member of the Santa Monica-Malibu Unified School District board.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2006-2012: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-present: U.S. representative for California's 26th congressional district.",
    },
  ],
  'house-mark-desaulnier-california-10th': [
    {
      category: 'position',
      label: 'Hotel and restaurant business',
      summary:
        '1970s-1991: Worked in the hotel and restaurant business before entering local government.',
    },
    {
      category: 'position',
      label: 'Concord City Council',
      summary:
        '1991-2004: Member of the Concord City Council, including service as mayor.',
    },
    {
      category: 'position',
      label: 'Contra Costa County Board of Supervisors',
      summary: '2004-2006: Member of the Contra Costa County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '2006-2008: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2008-2014: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-present: U.S. representative for California's 10th congressional district.",
    },
  ],
  'house-mike-thompson-california-4th': [
    {
      category: 'position',
      label: 'Army service and legislative work',
      summary:
        '1970s-1990: Army veteran who later worked in legislative, local-business, and public-policy roles in Northern California.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '1990-1998: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1999-present: U.S. representative for Northern California districts, now California's 4th congressional district.",
    },
  ],
  'house-zoe-lofgren-california-18th': [
    {
      category: 'position',
      label: 'Congressional staff and immigration law',
      summary:
        '1970s-1980: Worked as a congressional staffer and later practiced immigration law in Santa Clara County.',
    },
    {
      category: 'position',
      label: 'Santa Clara County Board of Supervisors',
      summary: '1981-1994: Member of the Santa Clara County Board of Supervisors.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1995-present: U.S. representative for California's 18th congressional district.",
    },
  ],
  'house-doris-matsui-california-7th': [
    {
      category: 'position',
      label: 'White House public liaison work',
      summary:
        '1970s-1981: Served in public-liaison roles during the Carter administration, including work in the White House.',
    },
    {
      category: 'position',
      label: 'Sacramento civic and nonprofit leadership',
      summary:
        '1980s-2005: Held community, cultural, and nonprofit leadership roles in the Sacramento region.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2005-present: U.S. representative for California's 7th congressional district.",
    },
  ],
  'house-john-garamendi-california-8th': [
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '1974-1976: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '1976-1990: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'California Insurance Commissioner',
      summary: '1991-1995 and 2003-2007: California insurance commissioner.',
    },
    {
      category: 'position',
      label: 'Deputy Secretary of the Interior',
      summary: '1995-1998: Deputy secretary of the U.S. Department of the Interior.',
    },
    {
      category: 'position',
      label: 'Lieutenant Governor of California',
      summary: '2007-2009: Lieutenant governor of California.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-present: U.S. representative for California's 8th congressional district.",
    },
  ],
  'house-nancy-pelosi-california-11th': [
    {
      category: 'position',
      label: 'Democratic Party organizing',
      summary:
        '1970s-1987: Rose through Democratic Party organizing, including service in national committee and California party leadership roles.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1987-present: U.S. representative for San Francisco, now California's 11th congressional district.",
    },
    {
      category: 'position',
      label: 'House Democratic whip',
      summary: '2002-2003: House Democratic whip.',
    },
    {
      category: 'position',
      label: 'House Democratic leader',
      summary: '2003-2007 and 2011-2023: Leader of House Democrats.',
    },
    {
      category: 'position',
      label: 'Speaker of the House',
      summary: '2007-2011 and 2019-2023: Speaker of the U.S. House of Representatives.',
    },
  ],
  'house-maxine-waters-california-43rd': [
    {
      category: 'position',
      label: 'Teaching and anti-poverty work',
      summary:
        '1960s-1976: Worked in teaching and anti-poverty programs in Los Angeles before entering elected office.',
    },
    {
      category: 'position',
      label: 'California State Assembly',
      summary: '1976-1990: Member of the California State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1991-present: U.S. representative for Los Angeles-area districts, now California's 43rd congressional district.",
    },
    {
      category: 'position',
      label: 'Congressional Black Caucus leadership',
      summary: '1997-1999: Chair of the Congressional Black Caucus.',
    },
    {
      category: 'position',
      label: 'House Financial Services Committee leadership',
      summary:
        '2013-2019 and 2023-present: Ranking member of the House Financial Services Committee; 2019-2023: Chair of the committee.',
    },
  ],
  'senate-jon-ossoff': [
    {
      category: 'position',
      label: 'Congressional staff',
      summary: 'Late 2000s: National-security staffer and aide to Representative John Lewis.',
    },
    {
      category: 'position',
      label: 'Investigative media work',
      summary:
        '2013-2021: Documentary and investigative-media executive at Insight TWI, producing international corruption and war-crimes reporting.',
    },
    {
      category: 'position',
      label: 'U.S. Senate campaign',
      summary: '2017: Democratic nominee in the nationally watched Georgia 6th district special election.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Georgia.',
    },
  ],
  'senate-tim-sheehy': [
    {
      category: 'position',
      label: 'U.S. Navy',
      summary:
        '2000s-2014: Navy SEAL officer with combat deployments in Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Aerial firefighting business',
      summary:
        '2014-2024: Founded and led Bridger Aerospace, building it into a major aerial-firefighting company based in Montana.',
    },
    {
      category: 'position',
      label: 'Montana business and veterans advocacy',
      summary:
        '2010s-2020s: Became a prominent Montana businessman and public advocate on wildfire, aviation, and veterans issues.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Montana.',
    },
  ],
  'senate-andy-kim': [
    {
      category: 'position',
      label: 'Foreign policy and national security staff',
      summary:
        '2000s-2018: Worked at USAID, the State Department, the Pentagon, and the White House on Afghanistan, Iraq, and broader national-security policy.',
    },
    {
      category: 'position',
      label: 'National Security Council',
      summary:
        '2013-2016: White House national security official in the Obama administration, focused heavily on Iraq and regional strategy.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-2024: U.S. representative for New Jersey's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2024-present: U.S. senator from New Jersey.',
    },
  ],
  'senate-katie-boyd-britt': [
    {
      category: 'position',
      label: 'Senate and campaign staff',
      summary:
        '2000s-2010s: Worked for Senator Richard Shelby in several roles, including press and policy work, and later served as campaign manager.',
    },
    {
      category: 'position',
      label: 'Chief of staff to Senator Richard Shelby',
      summary: '2016-2018: Chief of staff to Senator Richard Shelby.',
    },
    {
      category: 'position',
      label: 'Business Council of Alabama',
      summary: '2019-2021: President and CEO of the Business Council of Alabama.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Alabama.',
    },
  ],
  'senate-jim-banks': [
    {
      category: 'position',
      label: 'Military service and local life',
      summary:
        '2000s: Served in the Navy Reserve, including deployment to Afghanistan, while building a local career in northeast Indiana.',
    },
    {
      category: 'position',
      label: 'Indiana State Senate',
      summary: '2010-2016: Member of the Indiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2025: U.S. representative for Indiana's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Indiana.',
    },
  ],
  'senate-josh-hawley': [
    {
      category: 'position',
      label: 'Clerkships, litigation, and legal academia',
      summary:
        '2000s-2016: Clerked for Chief Justice John Roberts, practiced appellate litigation, and taught constitutional law and related subjects.',
    },
    {
      category: 'position',
      label: 'Missouri attorney general',
      summary: '2017-2019: Attorney general of Missouri.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2019-present: U.S. senator from Missouri.',
    },
  ],
  'senate-ruben-gallego': [
    {
      category: 'position',
      label: 'U.S. Marine Corps',
      summary: 'Early 2000s: Served in the Marine Corps and deployed to Iraq.',
    },
    {
      category: 'position',
      label: 'Arizona House of Representatives',
      summary: '2011-2014: Member of the Arizona House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2015-2025: U.S. representative for Arizona's 7th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Arizona.',
    },
  ],
  'senate-markwayne-mullin': [
    {
      category: 'position',
      label: 'Family business',
      summary:
        '1990s-2012: Took over and expanded Mullin Plumbing, Heating and Air into a sizable regional business in Oklahoma.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2023: U.S. representative for Oklahoma's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Oklahoma.',
    },
  ],
  'senate-tom-cotton': [
    {
      category: 'position',
      label: 'Law clerk and legal training',
      summary: 'Early 2000s: Clerked on the federal bench after finishing Harvard Law School.',
    },
    {
      category: 'position',
      label: 'U.S. Army',
      summary:
        '2005-2009: Army officer with deployments to Iraq and Afghanistan.',
    },
    {
      category: 'position',
      label: 'Private sector and consulting',
      summary: '2009-2012: Worked in private business and management consulting after leaving active duty.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2015: U.S. representative for Arkansas's 4th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Arkansas.',
    },
  ],
  'senate-elissa-slotkin': [
    {
      category: 'position',
      label: 'CIA and national security work',
      summary:
        '2000s-2014: CIA analyst and national-security official with multiple Iraq-related postings under both Republican and Democratic administrations.',
    },
    {
      category: 'position',
      label: 'Defense Department',
      summary:
        '2014-2017: Assistant secretary of Defense for international security affairs in the Obama administration.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2019-2025: U.S. representative for Michigan's 7th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Michigan.',
    },
  ],
  'senate-ashley-moody': [
    {
      category: 'position',
      label: 'State and federal prosecution',
      summary:
        '2000s: Worked as an assistant state attorney and later as an assistant U.S. attorney in Florida.',
    },
    {
      category: 'position',
      label: 'Circuit judge',
      summary: '2007-2017: Judge on Florida\'s Thirteenth Judicial Circuit Court.',
    },
    {
      category: 'position',
      label: 'Florida attorney general',
      summary: '2019-2025: Attorney general of Florida.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Florida.',
    },
  ],
  'senate-alex-padilla': [
    {
      category: 'position',
      label: 'Engineering and local political work',
      summary:
        '1990s: Worked as an engineer and entered Los Angeles-area Democratic politics after graduating from MIT.',
    },
    {
      category: 'position',
      label: 'Los Angeles City Council',
      summary:
        '1999-2006: Los Angeles city councilmember, including service as the youngest council president in city history.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '2006-2014: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'California secretary of state',
      summary: '2015-2021: Secretary of state of California.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from California.',
    },
  ],
  'senate-christopher-murphy': [
    {
      category: 'position',
      label: 'Local office and legal work',
      summary:
        '1990s: Worked as an attorney and got his start in local public service in Connecticut.',
    },
    {
      category: 'position',
      label: 'Connecticut House of Representatives',
      summary: '1999-2003: Member of the Connecticut House of Representatives.',
    },
    {
      category: 'position',
      label: 'Connecticut State Senate',
      summary: '2003-2007: Member of the Connecticut State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-2013: U.S. representative for Connecticut's 5th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Connecticut.',
    },
  ],
  'senate-ben-ray-lujan': [
    {
      category: 'position',
      label: 'New Mexico Public Regulation Commission',
      summary:
        '2005-2009: Commissioner on the New Mexico Public Regulation Commission, including service as chair.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-2021: U.S. representative for New Mexico's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'House Democratic leadership',
      summary:
        '2010s: Rose in House Democratic leadership, including service leading the Democratic Congressional Campaign Committee.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from New Mexico.',
    },
  ],
  'senate-brian-schatz': [
    {
      category: 'position',
      label: 'Hawaii House of Representatives',
      summary: '1998-2006: Member of the Hawaii House of Representatives.',
    },
    {
      category: 'position',
      label: 'Hawaii Democratic Party',
      summary: '2008-2010: Chair of the Democratic Party of Hawaii.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Hawaii',
      summary: '2010-2012: Lieutenant governor of Hawaii.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2012-present: U.S. senator from Hawaii.',
    },
  ],
  'senate-todd-young': [
    {
      category: 'position',
      label: 'U.S. Marine Corps',
      summary:
        '1990s-2000: Served in the U.S. Marine Corps before later earning graduate and law degrees.',
    },
    {
      category: 'position',
      label: 'Business and legal work',
      summary:
        '2000s: Worked in business and public-affairs roles while completing an MBA and a law degree.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-2017: U.S. representative for Indiana's 9th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from Indiana.',
    },
  ],
  'senate-martin-heinrich': [
    {
      category: 'position',
      label: 'Engineering and nonprofit work',
      summary:
        '1990s-early 2000s: Worked as an engineer and in nonprofit advocacy in New Mexico before entering elected office.',
    },
    {
      category: 'position',
      label: 'Albuquerque City Council',
      summary: '2003-2007: Albuquerque city councilor, including service as council president.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-2013: U.S. representative for New Mexico's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from New Mexico.',
    },
  ],
  'senate-mike-lee': [
    {
      category: 'position',
      label: 'Clerkships and constitutional law practice',
      summary:
        '1990s-2002: Clerked in the federal courts, including for then-Judge Samuel Alito, and practiced constitutional and appellate law.',
    },
    {
      category: 'position',
      label: 'Assistant U.S. attorney',
      summary: '2002-2005: Assistant U.S. attorney in Utah.',
    },
    {
      category: 'position',
      label: 'Counsel to Utah governor',
      summary: '2005-2010: General counsel to Utah Governor Jon Huntsman Jr.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Utah.',
    },
  ],
  'senate-ted-budd': [
    {
      category: 'position',
      label: 'Family business and entrepreneurship',
      summary:
        '1990s-2016: Worked in and helped run his family\'s gun-store and range business while also building other business interests.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2023: U.S. representative for North Carolina's 13th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from North Carolina.',
    },
  ],
  'senate-angela-d-alsobrooks': [
    {
      category: 'position',
      label: 'Prince George\'s County prosecutor',
      summary:
        'Late 1990s-2010: Prosecutor in Prince George\'s County, Maryland, rising through the local justice system.',
    },
    {
      category: 'position',
      label: 'Prince George\'s County state\'s attorney',
      summary: "2011-2018: State's attorney for Prince George's County.",
    },
    {
      category: 'position',
      label: 'Prince George\'s County executive',
      summary: "2018-2024: County executive of Prince George's County, Maryland.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Maryland.',
    },
  ],
  'senate-joni-ernst': [
    {
      category: 'position',
      label: 'Military service',
      summary:
        '1990s-2015: Served in the Iowa Army National Guard and Army Reserve, becoming one of the first female combat veterans elected to the Senate.',
    },
    {
      category: 'position',
      label: 'Montgomery County auditor',
      summary: '2005-2011: Auditor of Montgomery County, Iowa.',
    },
    {
      category: 'position',
      label: 'Iowa State Senate',
      summary: '2011-2014: Member of the Iowa State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Iowa.',
    },
  ],
  'senate-ted-cruz': [
    {
      category: 'position',
      label: 'Clerkships and appellate law',
      summary:
        '1990s-2001: Clerked for Judge J. Michael Luttig and Chief Justice William Rehnquist, then practiced appellate law and worked on the Bush campaign.',
    },
    {
      category: 'position',
      label: 'Federal executive branch policy roles',
      summary:
        '2001-2003: Served in Washington policy roles, including at the Federal Trade Commission and the Department of Justice.',
    },
    {
      category: 'position',
      label: 'Texas solicitor general',
      summary: '2003-2008: Solicitor general of Texas.',
    },
    {
      category: 'position',
      label: 'Private practice and public advocacy',
      summary:
        '2008-2013: Returned to private legal practice and became a prominent conservative legal and political voice.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Texas.',
    },
  ],
  'senate-cory-a-booker': [
    {
      category: 'position',
      label: 'Community development and local politics',
      summary:
        '1990s: Worked on urban-policy and community-development issues in Newark while entering local politics.',
    },
    {
      category: 'position',
      label: 'Newark City Council',
      summary: '1998-2002: Member of the Newark City Council.',
    },
    {
      category: 'position',
      label: 'Mayor of Newark',
      summary: '2006-2013: Mayor of Newark, New Jersey.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from New Jersey.',
    },
  ],
  'senate-john-fetterman': [
    {
      category: 'position',
      label: 'Community and nonprofit work',
      summary:
        '1990s-2005: Worked in community-development and nonprofit roles after AmeriCorps service and graduate study in public policy.',
    },
    {
      category: 'position',
      label: 'Mayor of Braddock',
      summary: '2006-2019: Mayor of Braddock, Pennsylvania.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Pennsylvania',
      summary: '2019-2023: Lieutenant governor of Pennsylvania.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Pennsylvania.',
    },
  ],
  'senate-raphael-g-warnock': [
    {
      category: 'position',
      label: 'Ministry and public advocacy',
      summary:
        '1990s-2005: Baptist minister, academic, and public advocate after theological training and church leadership work.',
    },
    {
      category: 'position',
      label: 'Ebenezer Baptist Church',
      summary:
        '2005-2021: Senior pastor of Ebenezer Baptist Church in Atlanta, the historic church of Martin Luther King Jr.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Georgia.',
    },
  ],
  'senate-james-lankford': [
    {
      category: 'position',
      label: 'Student ministry and youth leadership',
      summary:
        '1990s-2009: Spent more than two decades in Baptist student ministry, including leadership of the Falls Creek youth camp in Oklahoma.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-2015: U.S. representative for Oklahoma's 5th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Oklahoma.',
    },
  ],
  'senate-jon-husted': [
    {
      category: 'position',
      label: 'Ohio House of Representatives',
      summary: '2001-2009: Member of the Ohio House of Representatives, including service as speaker.',
    },
    {
      category: 'position',
      label: 'Ohio secretary of state',
      summary: '2011-2019: Secretary of state of Ohio.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Ohio',
      summary: '2019-2025: Lieutenant governor of Ohio.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Ohio.',
    },
  ],
  'senate-tammy-duckworth': [
    {
      category: 'position',
      label: 'Army National Guard',
      summary:
        '1990s-2004: Army aviator and Illinois National Guard officer; lost both legs when her helicopter was shot down in Iraq.',
    },
    {
      category: 'position',
      label: 'Illinois Department of Veterans Affairs',
      summary: '2006-2009: Director of the Illinois Department of Veterans Affairs.',
    },
    {
      category: 'position',
      label: 'Department of Veterans Affairs',
      summary: '2009-2011: Assistant secretary of Veterans Affairs for public and intergovernmental affairs.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2017: U.S. representative for Illinois's 8th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from Illinois.',
    },
  ],
  'senate-bernie-moreno': [
    {
      category: 'position',
      label: 'Automotive business',
      summary:
        '1990s-2020s: Built a large luxury-auto dealership business in Ohio after immigrating from Colombia and entering the family automotive trade.',
    },
    {
      category: 'position',
      label: 'Technology and blockchain ventures',
      summary:
        '2010s-2020s: Expanded into technology entrepreneurship, including digital-title and blockchain-related business projects.',
    },
    {
      category: 'position',
      label: 'Republican politics in Ohio',
      summary:
        '2020s: Emerged as a prominent Republican donor and Senate candidate in Ohio before winning statewide office.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Ohio.',
    },
  ],
  'senate-kirsten-e-gillibrand': [
    {
      category: 'position',
      label: 'Corporate law and federal service',
      summary:
        '1990s-2000s: Worked as a corporate lawyer and later served at HUD during the Clinton administration.',
    },
    {
      category: 'position',
      label: 'Private legal practice and upstate politics',
      summary:
        'Early 2000s-2006: Returned to law practice in New York while building a political base in upstate Democratic politics.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-2009: U.S. representative for New York's 20th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from New York.',
    },
  ],
  'senate-david-mccormick': [
    {
      category: 'position',
      label: 'U.S. Army',
      summary:
        '1980s-1990s: Army officer with service in the Gulf War before moving into business and policy roles.',
    },
    {
      category: 'position',
      label: 'Consulting and technology business',
      summary:
        '1990s-2005: Worked at McKinsey and later became a senior executive at the technology company FreeMarkets.',
    },
    {
      category: 'position',
      label: 'George W. Bush administration',
      summary:
        '2005-2009: Held senior national-security and economic posts, including under secretary of Commerce, deputy national security advisor, and under secretary of the Treasury.',
    },
    {
      category: 'position',
      label: 'Bridgewater Associates',
      summary:
        '2009-2022: Senior executive and later chief executive of Bridgewater Associates.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Pennsylvania.',
    },
  ],
  'senate-tim-scott': [
    {
      category: 'position',
      label: 'Business and local public service',
      summary:
        '1990s: Worked in insurance and financial services while entering local politics in the Charleston area.',
    },
    {
      category: 'position',
      label: 'Charleston County Council',
      summary: '1995-2009: Member of the Charleston County Council.',
    },
    {
      category: 'position',
      label: 'South Carolina House',
      summary: '2009-2011: Member of the South Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2011-2013: U.S. representative for South Carolina's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from South Carolina.',
    },
  ],
  'senate-catherine-cortez-masto': [
    {
      category: 'position',
      label: 'Nevada legal and public-service roles',
      summary:
        '1990s-2006: Worked as a federal and county prosecutor and later held senior legal roles in Nevada state government.',
    },
    {
      category: 'position',
      label: 'Nevada attorney general',
      summary: '2007-2015: Attorney general of Nevada.',
    },
    {
      category: 'position',
      label: 'Private practice and policy work',
      summary:
        '2015-2017: Returned to legal and public-policy work in Nevada after leaving the attorney general\'s office.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from Nevada.',
    },
  ],
  'senate-dan-sullivan': [
    {
      category: 'position',
      label: 'Marine Corps Reserve and legal work',
      summary:
        '1990s-2006: Marine Corps Reserve officer and lawyer, including federal clerkship, State Department, and Justice Department work.',
    },
    {
      category: 'position',
      label: 'Bush administration foreign-policy roles',
      summary:
        '2006-2009: Assistant secretary of State for economic and business affairs.',
    },
    {
      category: 'position',
      label: 'Alaska attorney general and natural resources commissioner',
      summary:
        '2009-2013: Alaska attorney general and later commissioner of the Department of Natural Resources.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Alaska.',
    },
  ],
  'senate-michael-f-bennet': [
    {
      category: 'position',
      label: 'Business and public-policy work',
      summary:
        '1990s-2003: Worked in business and public-policy roles, including at the Anschutz investment organization in Colorado.',
    },
    {
      category: 'position',
      label: 'Denver mayor\'s office',
      summary: '2003-2005: Chief of staff to Denver Mayor John Hickenlooper.',
    },
    {
      category: 'position',
      label: 'Denver Public Schools',
      summary: '2005-2009: Superintendent of Denver Public Schools.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from Colorado.',
    },
  ],
  'senate-pete-ricketts': [
    {
      category: 'position',
      label: 'Business career',
      summary:
        '1990s-2010s: Worked in finance and family business operations, including senior leadership roles at Ameritrade.',
    },
    {
      category: 'position',
      label: 'Nebraska Republican politics',
      summary:
        '2000s-2014: Became a major Republican donor and statewide political figure in Nebraska before winning the governorship.',
    },
    {
      category: 'position',
      label: 'Governor of Nebraska',
      summary: '2015-2023: Governor of Nebraska.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Nebraska.',
    },
  ],
  'senate-christopher-a-coons': [
    {
      category: 'position',
      label: 'Legal and nonprofit work',
      summary:
        '1990s-2000: Lawyer and nonprofit leader in Delaware before winning elected office.',
    },
    {
      category: 'position',
      label: 'New Castle County Council',
      summary: '2001-2005: President of the New Castle County Council.',
    },
    {
      category: 'position',
      label: 'New Castle County executive',
      summary: '2005-2010: County executive of New Castle County, Delaware.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2010-present: U.S. senator from Delaware.',
    },
  ],
  'senate-mark-kelly': [
    {
      category: 'position',
      label: 'U.S. Navy',
      summary:
        '1980s-2011: Naval aviator and combat pilot before retiring as a captain.',
    },
    {
      category: 'position',
      label: 'NASA astronaut',
      summary:
        '1996-2011: NASA astronaut and Space Shuttle commander.',
    },
    {
      category: 'position',
      label: 'Public advocacy',
      summary:
        '2010s: Became a national public figure through gun-safety advocacy and public work with Gabby Giffords.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2020-present: U.S. senator from Arizona.',
    },
  ],
  'senate-rand-paul': [
    {
      category: 'position',
      label: 'Medicine',
      summary:
        '1990s-2010: Practicing ophthalmologist in Kentucky and founder of his own eye clinic.',
    },
    {
      category: 'position',
      label: 'Tea Party activism',
      summary:
        '2009-2010: Rose to prominence in the Tea Party movement before running for the Senate.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Kentucky.',
    },
  ],
  'senate-steve-daines': [
    {
      category: 'position',
      label: 'Corporate and small-business career',
      summary:
        '1980s-2012: Worked at Procter & Gamble, later held executive roles at RightNow Technologies, and became a Montana small-business entrepreneur.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2015: U.S. representative for Montana's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Montana.',
    },
  ],
  'senate-lisa-blunt-rochester': [
    {
      category: 'position',
      label: 'Delaware state government and administration',
      summary:
        '1990s-2010s: Held senior roles in Delaware state government, including labor and personnel leadership.',
    },
    {
      category: 'position',
      label: 'Federal and campaign work',
      summary:
        '2010s: Worked in federal public engagement and Democratic campaign roles before seeking elected office.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2025: U.S. representative for Delaware's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Delaware.',
    },
  ],
  'senate-john-barrasso': [
    {
      category: 'position',
      label: 'Medicine',
      summary:
        '1970s-2002: Orthopedic surgeon in Wyoming and longtime physician in the state before entering elective office.',
    },
    {
      category: 'position',
      label: 'Wyoming State Senate',
      summary: '2003-2007: Member of the Wyoming State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2007-present: U.S. senator from Wyoming.',
    },
    {
      category: 'position',
      label: 'Senate Republican leadership',
      summary:
        '2020s: Rose in Senate Republican leadership, including service as conference chair and majority whip.',
    },
  ],
  'senate-marsha-blackburn': [
    {
      category: 'position',
      label: 'Business and state politics',
      summary:
        '1980s-1998: Worked in sales, business, and conservative grassroots politics in Tennessee before winning state office.',
    },
    {
      category: 'position',
      label: 'Tennessee State Senate',
      summary: '1999-2003: Member of the Tennessee State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-2019: U.S. representative for Tennessee's 7th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2019-present: U.S. senator from Tennessee.',
    },
  ],
  'senate-rick-scott': [
    {
      category: 'position',
      label: 'Health care business',
      summary:
        '1980s-2010: Entrepreneur and health-care executive, including leadership of Columbia/HCA and later Solantic.',
    },
    {
      category: 'position',
      label: 'Governor of Florida',
      summary: '2011-2019: Governor of Florida.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2019-present: U.S. senator from Florida.',
    },
  ],
  'senate-susan-m-collins': [
    {
      category: 'position',
      label: 'Maine public administration',
      summary:
        '1970s-1994: Worked in Maine state government and federal regional administration, including commissioner and business-regulation posts.',
    },
    {
      category: 'position',
      label: 'New England SBA leadership',
      summary: '1992-1993: Regional director of the Small Business Administration in New England.',
    },
    {
      category: 'position',
      label: 'Maine state treasurer',
      summary: '1993: State treasurer of Maine.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1997-present: U.S. senator from Maine.',
    },
  ],
  'senate-james-c-justice': [
    {
      category: 'position',
      label: 'Coal, agriculture, and hospitality business',
      summary:
        '1970s-2016: Built a large business empire in coal, agriculture, and hospitality in West Virginia and surrounding states.',
    },
    {
      category: 'position',
      label: 'Governor of West Virginia',
      summary: '2017-2025: Governor of West Virginia.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from West Virginia.',
    },
  ],
  'senate-john-cornyn': [
    {
      category: 'position',
      label: 'Texas judiciary',
      summary:
        '1980s-1997: State district judge and later justice on the Texas Supreme Court.',
    },
    {
      category: 'position',
      label: 'Texas attorney general',
      summary: '1999-2002: Attorney general of Texas.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2002-present: U.S. senator from Texas.',
    },
    {
      category: 'position',
      label: 'Senate Republican leadership',
      summary:
        '2010s-2020s: Held major Senate Republican leadership roles, including whip.',
    },
  ],
  'senate-john-kennedy': [
    {
      category: 'position',
      label: 'Academic, legal, and state policy work',
      summary:
        '1970s-1996: Worked in law, higher education, and state policy roles in Louisiana, including service under Governor Buddy Roemer.',
    },
    {
      category: 'position',
      label: 'Louisiana secretary of revenue',
      summary: '1996-1999: Louisiana secretary of revenue.',
    },
    {
      category: 'position',
      label: 'Louisiana state treasurer',
      summary: '2000-2017: Louisiana state treasurer.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from Louisiana.',
    },
  ],
  'senate-john-w-hickenlooper': [
    {
      category: 'position',
      label: 'Business entrepreneurship',
      summary:
        '1980s-2003: Geologist turned entrepreneur who cofounded the Wynkoop Brewing Company and became a well-known Denver business figure.',
    },
    {
      category: 'position',
      label: 'Mayor of Denver',
      summary: '2003-2011: Mayor of Denver.',
    },
    {
      category: 'position',
      label: 'Governor of Colorado',
      summary: '2011-2019: Governor of Colorado.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Colorado.',
    },
  ],
  'senate-mike-crapo': [
    {
      category: 'position',
      label: 'Idaho State Senate',
      summary: '1984-1992: Member of the Idaho State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-1999: U.S. representative for Idaho's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1999-present: U.S. senator from Idaho.',
    },
  ],
  'senate-roger-f-wicker': [
    {
      category: 'position',
      label: 'Military and legal service',
      summary:
        '1970s-1987: Served in the Air Force and Air Force Reserve, practiced law, and worked in Mississippi public service roles.',
    },
    {
      category: 'position',
      label: 'Mississippi State Senate',
      summary: '1988-1995: Member of the Mississippi State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1995-2007: U.S. representative for Mississippi's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2007-present: U.S. senator from Mississippi.',
    },
  ],
  'senate-charles-e-schumer': [
    {
      category: 'position',
      label: 'New York State Assembly',
      summary: '1975-1981: Member of the New York State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1981-1999: U.S. representative for New York's Brooklyn-Queens district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1999-present: U.S. senator from New York.',
    },
    {
      category: 'position',
      label: 'Senate Democratic leadership',
      summary:
        '2010s-2020s: Rose to become Senate Democratic leader, serving as minority leader and later majority leader.',
    },
  ],
  'senate-deb-fischer': [
    {
      category: 'position',
      label: 'Agriculture and local public life',
      summary:
        '1990s-2004: Rancher and active civic figure in rural Nebraska before entering statewide politics.',
    },
    {
      category: 'position',
      label: 'Nebraska Legislature',
      summary: '2005-2013: Member of the Nebraska Legislature.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Nebraska.',
    },
  ],
  'senate-john-boozman': [
    {
      category: 'position',
      label: 'Health care',
      summary:
        '1970s-2001: Optometrist and cofounder of a family eye-care practice in Arkansas before entering Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-2011: U.S. representative for Arkansas's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Arkansas.',
    },
  ],
  'senate-patty-murray': [
    {
      category: 'position',
      label: 'Education and grassroots politics',
      summary:
        '1980s: Worked in preschool education and parent advocacy, gaining statewide attention as a grassroots activist.',
    },
    {
      category: 'position',
      label: 'Washington State Senate',
      summary: '1989-1993: Member of the Washington State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1993-present: U.S. senator from Washington.',
    },
    {
      category: 'position',
      label: 'Senate Democratic leadership',
      summary:
        '2000s-2020s: Held major Senate Democratic leadership posts, including conference secretary and president pro tempore.',
    },
  ],
  'senate-elizabeth-warren': [
    {
      category: 'position',
      label: 'Academic career',
      summary:
        '1970s-2010: Law professor and nationally known scholar on bankruptcy, consumer finance, and middle-class economics.',
    },
    {
      category: 'position',
      label: 'Financial-crisis oversight and consumer protection',
      summary:
        '2008-2011: Chaired the congressional TARP oversight panel and later helped stand up the Consumer Financial Protection Bureau.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Massachusetts.',
    },
    {
      category: 'position',
      label: 'Presidential campaign',
      summary: '2019-2020: Candidate for the Democratic presidential nomination.',
    },
  ],
  'senate-lisa-murkowski': [
    {
      category: 'position',
      label: 'Alaska House of Representatives',
      summary: '1999-2002: Member of the Alaska House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary:
        '2002-present: U.S. senator from Alaska, first by appointment and then by election, including a successful write-in reelection campaign in 2010.',
    },
  ],
  'senate-margaret-wood-hassan': [
    {
      category: 'position',
      label: 'Law, advocacy, and education policy',
      summary:
        '1980s-2004: Worked as an attorney and became active in education, disability-rights, and civic advocacy in New Hampshire.',
    },
    {
      category: 'position',
      label: 'New Hampshire State Senate',
      summary: '2004-2010: Member of the New Hampshire State Senate.',
    },
    {
      category: 'position',
      label: 'Governor of New Hampshire',
      summary: '2013-2017: Governor of New Hampshire.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from New Hampshire.',
    },
  ],
  'senate-tim-kaine': [
    {
      category: 'position',
      label: 'Civil rights law and local politics',
      summary:
        '1980s-1994: Civil-rights lawyer in Richmond after missionary work in Honduras, then entered local politics.',
    },
    {
      category: 'position',
      label: 'Richmond city government',
      summary: '1994-2001: Richmond city councilmember and then mayor.',
    },
    {
      category: 'position',
      label: 'Virginia statewide office',
      summary: '2002-2010: Lieutenant governor of Virginia and then governor of Virginia.',
    },
    {
      category: 'position',
      label: 'Democratic National Committee',
      summary: '2009-2011: Chair of the Democratic National Committee.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Virginia.',
    },
  ],
  'senate-tina-smith': [
    {
      category: 'position',
      label: 'Political consulting and advocacy',
      summary:
        '1980s-2014: Worked in marketing, political consulting, and progressive advocacy, including senior leadership at Planned Parenthood of Minnesota.',
    },
    {
      category: 'position',
      label: 'Minnesota governor\'s office',
      summary: '2011-2014: Chief of staff to Minnesota Governor Mark Dayton.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Minnesota',
      summary: '2015-2018: Lieutenant governor of Minnesota.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2018-present: U.S. senator from Minnesota.',
    },
  ],
  'senate-jeff-merkley': [
    {
      category: 'position',
      label: 'Public policy, housing, and nonprofit work',
      summary:
        '1980s-1998: Worked in public policy, defense analysis, and nonprofit affordable-housing work before entering elected office in Oregon.',
    },
    {
      category: 'position',
      label: 'Oregon House of Representatives',
      summary: '1999-2009: Member of the Oregon House of Representatives, including service as speaker.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from Oregon.',
    },
  ],
  'senate-john-hoeven': [
    {
      category: 'position',
      label: 'Banking and economic-development leadership',
      summary:
        '1980s-2000: Worked in banking and economic-development roles in North Dakota, including leadership at the Bank of North Dakota.',
    },
    {
      category: 'position',
      label: 'Governor of North Dakota',
      summary: '2000-2010: Governor of North Dakota.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from North Dakota.',
    },
  ],
  'senate-lindsey-graham': [
    {
      category: 'position',
      label: 'Air Force legal service',
      summary:
        '1980s-1992: Lawyer in the U.S. Air Force and Air Force Reserve, serving as a judge advocate.',
    },
    {
      category: 'position',
      label: 'South Carolina House',
      summary: '1993-1995: Member of the South Carolina House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1995-2003: U.S. representative for South Carolina's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2003-present: U.S. senator from South Carolina.',
    },
  ],
  'senate-ron-johnson': [
    {
      category: 'position',
      label: 'Manufacturing business career',
      summary:
        '1980s-2010: Accountant and manufacturing executive, eventually leading the Wisconsin plastics company PACUR.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Wisconsin.',
    },
  ],
  'senate-sheldon-whitehouse': [
    {
      category: 'position',
      label: 'Federal clerkship and state policy roles',
      summary:
        '1980s-1993: Clerked in the federal courts, practiced law, and later served in policy and legal roles in Rhode Island state government.',
    },
    {
      category: 'position',
      label: 'U.S. attorney for Rhode Island',
      summary: '1994-1998: U.S. attorney for Rhode Island.',
    },
    {
      category: 'position',
      label: 'Rhode Island attorney general',
      summary: '1999-2003: Attorney general of Rhode Island.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2007-present: U.S. senator from Rhode Island.',
    },
  ],
  'senate-cynthia-m-lummis': [
    {
      category: 'position',
      label: 'Wyoming legislature',
      summary:
        '1985-1995: Served in the Wyoming House and later the Wyoming Senate.',
    },
    {
      category: 'position',
      label: 'Wyoming state treasurer',
      summary: '1999-2007: Wyoming state treasurer.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-2017: U.S. representative for Wyoming's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Wyoming.',
    },
  ],
  'senate-jerry-moran': [
    {
      category: 'position',
      label: 'Kansas State Senate',
      summary:
        '1989-1997: Member of the Kansas State Senate, including service as majority leader.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-2011: U.S. representative for Kansas's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Kansas.',
    },
  ],
  'senate-mark-r-warner': [
    {
      category: 'position',
      label: 'Business and venture investing',
      summary:
        '1980s-2001: Built a fortune in telecommunications and venture investing before moving into statewide politics in Virginia.',
    },
    {
      category: 'position',
      label: 'Governor of Virginia',
      summary: '2002-2006: Governor of Virginia.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from Virginia.',
    },
  ],
  'senate-mike-rounds': [
    {
      category: 'position',
      label: 'Business and insurance',
      summary:
        '1980s-1990s: Worked in insurance and small business in South Dakota before entering state politics.',
    },
    {
      category: 'position',
      label: 'South Dakota State Senate',
      summary:
        '1991-2001: Member of the South Dakota State Senate, including service as majority leader.',
    },
    {
      category: 'position',
      label: 'Governor of South Dakota',
      summary: '2003-2011: Governor of South Dakota.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from South Dakota.',
    },
  ],
  'senate-tommy-tuberville': [
    {
      category: 'position',
      label: 'College football coaching',
      summary:
        '1970s-2020: College football coach, best known for his long run as head coach at Auburn.',
    },
    {
      category: 'position',
      label: 'Sports broadcasting and public profile',
      summary:
        'Late 2010s-2020: Remained a public figure through broadcasting, commentary, and political activity after coaching.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Alabama.',
    },
  ],
  'senate-shelley-moore-capito': [
    {
      category: 'position',
      label: 'West Virginia House of Delegates',
      summary: '1997-2001: Member of the West Virginia House of Delegates.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-2015: U.S. representative for West Virginia's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from West Virginia.',
    },
  ],
  'senate-tammy-baldwin': [
    {
      category: 'position',
      label: 'Local government in Dane County',
      summary:
        '1980s-1990s: Served in local government in Dane County, Wisconsin, while building a public-policy and legal career.',
    },
    {
      category: 'position',
      label: 'Wisconsin State Assembly',
      summary: '1993-1999: Member of the Wisconsin State Assembly.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1999-2013: U.S. representative for Wisconsin's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Wisconsin.',
    },
  ],
  'senate-adam-b-schiff': [
    {
      category: 'position',
      label: 'Federal prosecution',
      summary:
        '1990s: Assistant U.S. attorney in Los Angeles, including high-profile federal criminal prosecutions.',
    },
    {
      category: 'position',
      label: 'California State Senate',
      summary: '1996-2000: Member of the California State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2001-2024: U.S. representative for California's Los Angeles-area congressional district.",
    },
    {
      category: 'position',
      label: 'House Intelligence leadership',
      summary:
        '2010s-2020s: Became a leading Democratic voice on intelligence and Trump investigations, including service as House Intelligence Committee chair.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2024-present: U.S. senator from California.',
    },
  ],
  'senate-amy-klobuchar': [
    {
      category: 'position',
      label: 'Law and local civic work',
      summary:
        '1980s-1998: Practiced law in Minnesota and became active in local civic and public-policy work.',
    },
    {
      category: 'position',
      label: 'Hennepin County attorney',
      summary: '1999-2007: Hennepin County attorney.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2007-present: U.S. senator from Minnesota.',
    },
  ],
  'senate-john-r-curtis': [
    {
      category: 'position',
      label: 'Business and local community leadership',
      summary:
        '1990s-2009: Technology and business executive in Utah before moving into local elected office.',
    },
    {
      category: 'position',
      label: 'Mayor of Provo',
      summary: '2010-2017: Mayor of Provo, Utah.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2025: U.S. representative for Utah's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2025-present: U.S. senator from Utah.',
    },
  ],
  'senate-john-thune': [
    {
      category: 'position',
      label: 'South Dakota public and business roles',
      summary:
        '1980s-1996: Worked in South Dakota state government and business, including railroads and tourism-related public roles.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1997-2003: U.S. representative for South Dakota's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2005-present: U.S. senator from South Dakota.',
    },
    {
      category: 'position',
      label: 'Senate Republican leadership',
      summary:
        '2010s-2020s: Rose through Senate Republican leadership, serving as whip and then majority leader.',
    },
  ],
  'senate-kevin-cramer': [
    {
      category: 'position',
      label: 'North Dakota economic-development roles',
      summary:
        '1990s-2003: Worked in economic-development and tourism-related roles in North Dakota state government.',
    },
    {
      category: 'position',
      label: 'North Dakota Public Service Commission',
      summary: '2003-2012: Member of the North Dakota Public Service Commission.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2013-2019: U.S. representative for North Dakota's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2019-present: U.S. senator from North Dakota.',
    },
  ],
  'senate-roger-marshall': [
    {
      category: 'position',
      label: 'Medicine',
      summary:
        '1980s-2010: Obstetrician and physician in Kansas, including years running a medical practice in Great Bend.',
    },
    {
      category: 'position',
      label: 'Kansas House of Representatives',
      summary: '2011-2017: Member of the Kansas House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2021: U.S. representative for Kansas's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Kansas.',
    },
  ],
  'senate-thom-tillis': [
    {
      category: 'position',
      label: 'Business career and local office',
      summary:
        '1990s-2006: Worked in technology and consulting management while serving in local government in the Charlotte suburbs.',
    },
    {
      category: 'position',
      label: 'North Carolina House',
      summary:
        '2007-2015: Member of the North Carolina House of Representatives, including service as speaker.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from North Carolina.',
    },
  ],
  'senate-bill-hagerty': [
    {
      category: 'position',
      label: 'Finance, consulting, and business',
      summary:
        '1980s-2010: Worked in finance, consulting, and private business leadership in Tennessee and nationally.',
    },
    {
      category: 'position',
      label: 'Tennessee economic development',
      summary: '2011-2014: Tennessee commissioner of economic and community development.',
    },
    {
      category: 'position',
      label: 'Ambassador to Japan',
      summary: '2017-2019: U.S. ambassador to Japan.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2021-present: U.S. senator from Tennessee.',
    },
  ],
  'senate-cindy-hyde-smith': [
    {
      category: 'position',
      label: 'Agriculture and local public life',
      summary:
        '1990s: Active in agricultural business and local public life in Mississippi before joining state politics.',
    },
    {
      category: 'position',
      label: 'Mississippi State Senate',
      summary: '2000-2012: Member of the Mississippi State Senate.',
    },
    {
      category: 'position',
      label: 'Mississippi commissioner of agriculture and commerce',
      summary: '2012-2018: Mississippi commissioner of agriculture and commerce.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2018-present: U.S. senator from Mississippi.',
    },
  ],
  'senate-chris-van-hollen': [
    {
      category: 'position',
      label: 'Maryland House of Delegates',
      summary: '1990-1994: Member of the Maryland House of Delegates.',
    },
    {
      category: 'position',
      label: 'Maryland State Senate',
      summary: '1995-2003: Member of the Maryland State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2003-2017: U.S. representative for Maryland's 8th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2017-present: U.S. senator from Maryland.',
    },
  ],
  'senate-gary-c-peters': [
    {
      category: 'position',
      label: 'Military, business, and public finance',
      summary:
        '1980s-1994: Served in the Navy Reserve, worked in business, and built experience in finance and public administration in Michigan.',
    },
    {
      category: 'position',
      label: 'Michigan State Senate',
      summary: '1995-2002: Member of the Michigan State Senate.',
    },
    {
      category: 'position',
      label: 'State and federal executive roles',
      summary:
        '2000s: Held state lottery and budget roles in Michigan and later served in the Obama administration at the Department of the Treasury.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-2015: U.S. representative for Michigan's Detroit-area congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Michigan.',
    },
  ],
  'senate-maria-cantwell': [
    {
      category: 'position',
      label: 'Washington House of Representatives',
      summary: '1987-1993: Member of the Washington House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1993-1995: U.S. representative for Washington's 1st congressional district.",
    },
    {
      category: 'position',
      label: 'Technology sector',
      summary:
        '1995-2000: Worked in the technology sector, including a senior role at RealNetworks.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2001-present: U.S. senator from Washington.',
    },
  ],
  'senate-bill-cassidy': [
    {
      category: 'position',
      label: 'Medicine and public health',
      summary:
        '1980s-2006: Physician and LSU medical-school professor who also helped create a clinic for uninsured patients in Baton Rouge.',
    },
    {
      category: 'position',
      label: 'Louisiana State Senate',
      summary: '2006-2009: Member of the Louisiana State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2009-2015: U.S. representative for Louisiana's 6th congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2015-present: U.S. senator from Louisiana.',
    },
  ],
  'senate-jacky-rosen': [
    {
      category: 'position',
      label: 'Technology and community work',
      summary:
        '1980s-2016: Computer programmer, software professional, and active community leader in Nevada.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2017-2019: U.S. representative for Nevada's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2019-present: U.S. senator from Nevada.',
    },
  ],
  'senate-eric-schmitt': [
    {
      category: 'position',
      label: 'Missouri state politics',
      summary:
        '2000s-2017: Held local office and then served in the Missouri Senate, becoming a prominent Republican figure in state politics.',
    },
    {
      category: 'position',
      label: 'Missouri state treasurer',
      summary: '2017-2019: Treasurer of Missouri.',
    },
    {
      category: 'position',
      label: 'Missouri attorney general',
      summary: '2019-2023: Attorney general of Missouri.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Missouri.',
    },
  ],
  'senate-jack-reed': [
    {
      category: 'position',
      label: 'Military and legal service',
      summary:
        '1970s-1984: West Point graduate, Army officer, and attorney before entering Rhode Island state politics.',
    },
    {
      category: 'position',
      label: 'Rhode Island State Senate',
      summary: '1985-1991: Member of the Rhode Island State Senate.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1991-1997: U.S. representative for Rhode Island's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1997-present: U.S. senator from Rhode Island.',
    },
  ],
  'senate-ron-wyden': [
    {
      category: 'position',
      label: 'Legal aid and consumer advocacy',
      summary:
        '1970s-1980: Worked in legal aid, elder advocacy, and anti-poverty policy in Oregon before entering Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1981-1996: U.S. representative for Oregon's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1996-present: U.S. senator from Oregon.',
    },
  ],
  'senate-mazie-k-hirono': [
    {
      category: 'position',
      label: 'Hawaii House of Representatives',
      summary: '1981-1994: Member of the Hawaii House of Representatives.',
    },
    {
      category: 'position',
      label: 'Lieutenant governor of Hawaii',
      summary: '1994-2002: Lieutenant governor of Hawaii.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-2013: U.S. representative for Hawaii's 2nd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Hawaii.',
    },
  ],
  'senate-peter-welch': [
    {
      category: 'position',
      label: 'Law and public service in Vermont',
      summary:
        '1970s-2002: Attorney and public figure in Vermont civic life before returning to elected office in the state senate.',
    },
    {
      category: 'position',
      label: 'Vermont State Senate',
      summary: '2003-2007: Member of the Vermont State Senate, including service as president pro tempore.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "2007-2023: U.S. representative for Vermont's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2023-present: U.S. senator from Vermont.',
    },
  ],
  'senate-edward-j-markey': [
    {
      category: 'position',
      label: 'Massachusetts House of Representatives',
      summary: '1973-1976: Member of the Massachusetts House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1976-2013: U.S. representative for Massachusetts's Boston-area congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Massachusetts.',
    },
  ],
  'senate-jeanne-shaheen': [
    {
      category: 'position',
      label: 'Teaching, local business, and community work',
      summary:
        '1970s-1992: Worked in education, local business, and community leadership in New Hampshire before entering state politics.',
    },
    {
      category: 'position',
      label: 'New Hampshire State Senate',
      summary: '1992-1996: Member of the New Hampshire State Senate.',
    },
    {
      category: 'position',
      label: 'Governor of New Hampshire',
      summary: '1997-2003: Governor of New Hampshire.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from New Hampshire.',
    },
  ],
  'senate-richard-blumenthal': [
    {
      category: 'position',
      label: 'Military and federal legal service',
      summary:
        '1970s-1984: Marine Corps Reserve officer, federal prosecutor, and legal official before entering Connecticut politics.',
    },
    {
      category: 'position',
      label: 'Connecticut legislature',
      summary: '1984-1991: Served in the Connecticut House and later the Connecticut State Senate.',
    },
    {
      category: 'position',
      label: 'Connecticut attorney general',
      summary: '1991-2011: Attorney general of Connecticut.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2011-present: U.S. senator from Connecticut.',
    },
  ],
  'senate-angus-s-jr-king': [
    {
      category: 'position',
      label: 'Law, energy policy, and business',
      summary:
        '1970s-1994: Lawyer, entrepreneur, and public-policy figure in Maine, including work in renewable-energy and civic broadcasting ventures.',
    },
    {
      category: 'position',
      label: 'Governor of Maine',
      summary: '1995-2003: Governor of Maine.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2013-present: U.S. senator from Maine, caucusing with Democrats while remaining an independent.',
    },
  ],
  'senate-richard-j-durbin': [
    {
      category: 'position',
      label: 'Legal work and state staff roles',
      summary:
        '1960s-1982: Attorney and public-policy aide in Illinois before winning a seat in Congress.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1983-1997: U.S. representative for Illinois's Springfield-area congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1997-present: U.S. senator from Illinois.',
    },
    {
      category: 'position',
      label: 'Senate Democratic leadership',
      summary:
        '2000s-2020s: Rose to become Senate Democratic whip and one of the chamber\'s senior party leaders.',
    },
  ],
  'senate-james-e-risch': [
    {
      category: 'position',
      label: 'Law and Idaho local government',
      summary:
        '1970s-1994: Prosecutor, private attorney, and local public official in Idaho before returning to state legislative politics.',
    },
    {
      category: 'position',
      label: 'Idaho State Senate and statewide office',
      summary:
        '1995-2009: Member of the Idaho State Senate, then lieutenant governor, and briefly governor of Idaho.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2009-present: U.S. senator from Idaho.',
    },
  ],
  'senate-bernard-sanders': [
    {
      category: 'position',
      label: 'Activism and independent politics',
      summary:
        '1960s-1981: Antiwar activist, writer, and independent political organizer before winning local office in Burlington.',
    },
    {
      category: 'position',
      label: 'Mayor of Burlington',
      summary: '1981-1989: Mayor of Burlington, Vermont.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1991-2007: U.S. representative for Vermont's at-large congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '2007-present: U.S. senator from Vermont.',
    },
    {
      category: 'position',
      label: 'Presidential campaigns',
      summary: '2016 and 2020: Candidate for the Democratic presidential nomination.',
    },
  ],
  'senate-mitch-mcconnell': [
    {
      category: 'position',
      label: 'Federal legal and executive-branch service',
      summary:
        '1960s-1977: Army Reserve veteran, Senate staffer, and Justice Department official before returning to Kentucky politics.',
    },
    {
      category: 'position',
      label: 'Jefferson County Judge/Executive',
      summary: '1977-1984: Jefferson County judge/executive in Kentucky.',
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1985-present: U.S. senator from Kentucky.',
    },
    {
      category: 'position',
      label: 'Senate Republican leadership',
      summary:
        '2000s-2020s: Longtime leader of Senate Republicans, including service as minority leader and majority leader.',
    },
  ],
  'senate-chuck-grassley': [
    {
      category: 'position',
      label: 'Agriculture and Iowa state politics',
      summary:
        '1950s-1974: Farmer and public official in Iowa, including long service in the Iowa House of Representatives.',
    },
    {
      category: 'position',
      label: 'U.S. representative',
      summary: "1975-1981: U.S. representative for Iowa's 3rd congressional district.",
    },
    {
      category: 'position',
      label: 'U.S. senator',
      summary: '1981-present: U.S. senator from Iowa.',
    },
    {
      category: 'position',
      label: 'Senate institutional leadership',
      summary:
        '2010s-2020s: Senior Senate institutional figure, including service as president pro tempore and longtime committee chair.',
    },
  ],
  'judicial-john-g-roberts-jr': [
    {
      category: 'position',
      label: 'Appellate clerkships and Reagan administration',
      summary:
        'Late 1970s-1980s: Clerked for Judge Henry Friendly and then-Justice William Rehnquist before serving in the Reagan administration and the White House Counsel\'s Office.',
    },
    {
      category: 'position',
      label: 'Appellate advocate',
      summary:
        '1980s-2003: Built a leading appellate-law practice in Washington, including a stint as principal deputy solicitor general.',
    },
    {
      category: 'position',
      label: 'D.C. Circuit',
      summary: '2003-2005: Judge on the U.S. Court of Appeals for the D.C. Circuit.',
    },
    {
      category: 'position',
      label: 'Chief Justice of the United States',
      summary: '2005-present: Chief justice of the United States.',
    },
  ],
  'judicial-clarence-thomas': [
    {
      category: 'position',
      label: 'Missouri and federal policy roles',
      summary:
        '1970s-1981: Worked in Missouri state government and later as a Senate and executive-branch aide after law school.',
    },
    {
      category: 'position',
      label: 'Department of Education and EEOC',
      summary:
        '1981-1990: Served as assistant secretary for civil rights at the Department of Education and then chaired the Equal Employment Opportunity Commission.',
    },
    {
      category: 'position',
      label: 'D.C. Circuit',
      summary: '1990-1991: Judge on the U.S. Court of Appeals for the D.C. Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '1991-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-samuel-a-alito-jr': [
    {
      category: 'position',
      label: 'Federal prosecutor and Justice Department lawyer',
      summary:
        'Late 1970s-1987: Assistant U.S. attorney in New Jersey and later a Justice Department lawyer in Washington, including work in the solicitor general\'s office and OLC.',
    },
    {
      category: 'position',
      label: 'U.S. attorney for New Jersey',
      summary: '1987-1990: U.S. attorney for the District of New Jersey.',
    },
    {
      category: 'position',
      label: 'Third Circuit',
      summary: '1990-2006: Judge on the U.S. Court of Appeals for the Third Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2006-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-sonia-sotomayor': [
    {
      category: 'position',
      label: 'Manhattan district attorney\'s office',
      summary: '1979-1984: Assistant district attorney in Manhattan.',
    },
    {
      category: 'position',
      label: 'Private practice',
      summary: '1984-1992: Commercial litigator in private practice in New York.',
    },
    {
      category: 'position',
      label: 'Southern District of New York',
      summary: '1992-1998: Judge on the U.S. District Court for the Southern District of New York.',
    },
    {
      category: 'position',
      label: 'Second Circuit',
      summary: '1998-2009: Judge on the U.S. Court of Appeals for the Second Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2009-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-elena-kagan': [
    {
      category: 'position',
      label: 'Academic and policy work',
      summary:
        '1980s-1995: Clerked for Judge Abner Mikva and Justice Thurgood Marshall, taught law, and later served in the Clinton administration.',
    },
    {
      category: 'position',
      label: 'Harvard Law School',
      summary: '1999-2009: Professor and then dean of Harvard Law School.',
    },
    {
      category: 'position',
      label: 'Solicitor General of the United States',
      summary: '2009-2010: Solicitor general of the United States.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2010-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-neil-m-gorsuch': [
    {
      category: 'position',
      label: 'Clerkships and private practice',
      summary:
        '1990s-2005: Clerked for Judge David Sentelle and Justices Byron White and Anthony Kennedy, then practiced appellate and trial law in Washington.',
    },
    {
      category: 'position',
      label: 'Justice Department',
      summary: '2005-2006: Principal deputy associate attorney general at the Department of Justice.',
    },
    {
      category: 'position',
      label: 'Tenth Circuit',
      summary: '2006-2017: Judge on the U.S. Court of Appeals for the Tenth Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2017-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-brett-m-kavanaugh': [
    {
      category: 'position',
      label: 'Independent counsel and Washington legal work',
      summary:
        '1990s-2001: Clerked for Judge Walter Stapleton and Justice Anthony Kennedy, worked in the Starr investigation, and held other Washington legal posts.',
    },
    {
      category: 'position',
      label: 'George W. Bush White House',
      summary:
        '2001-2006: Counsel and then staff secretary to President George W. Bush.',
    },
    {
      category: 'position',
      label: 'D.C. Circuit',
      summary: '2006-2018: Judge on the U.S. Court of Appeals for the D.C. Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2018-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-amy-coney-barrett': [
    {
      category: 'position',
      label: 'Clerkships and private practice',
      summary:
        '1997-2002: Clerked for Judge Laurence Silberman and Justice Antonin Scalia, then practiced law in Washington.',
    },
    {
      category: 'position',
      label: 'Notre Dame Law School',
      summary: '2002-2017: Law professor at Notre Dame, focused on constitutional law, federal courts, and statutory interpretation.',
    },
    {
      category: 'position',
      label: 'Seventh Circuit',
      summary: '2017-2020: Judge on the U.S. Court of Appeals for the Seventh Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2020-present: Associate justice of the Supreme Court.',
    },
  ],
  'judicial-ketanji-brown-jackson': [
    {
      category: 'position',
      label: 'Clerkships, private practice, and public defense',
      summary:
        'Late 1990s-2010: Clerked for several federal judges and Justice Stephen Breyer, practiced law, and served as an assistant federal public defender.',
    },
    {
      category: 'position',
      label: 'U.S. Sentencing Commission',
      summary: '2010-2014: Vice chair of the U.S. Sentencing Commission.',
    },
    {
      category: 'position',
      label: 'District Court',
      summary:
        '2013-2021: Judge on the U.S. District Court for the District of Columbia.',
    },
    {
      category: 'position',
      label: 'D.C. Circuit',
      summary: '2021-2022: Judge on the U.S. Court of Appeals for the D.C. Circuit.',
    },
    {
      category: 'position',
      label: 'Associate Justice',
      summary: '2022-present: Associate justice of the Supreme Court.',
    },
  ],
  'executive-john-jovanovic-export-import-bank-of-the-united-states': [
    positionRecord(
      'Mercuria Energy Group',
      '2010s: Managed investment and business-building work across North and South America in the private energy sector.',
    ),
    positionRecord(
      'U.S. International Development Finance Corporation',
      'Early 2020s: Served as regional head and managing director for the Aegean and Western Balkans, opened DFC’s first overseas office, and worked on financing alternatives to Chinese and Russian influence.',
    ),
    positionRecord(
      'Asplundh',
      '2020s: Served as chief strategy officer, overseeing growth initiatives, digital innovation, corporate development, and external affairs.',
    ),
    positionRecord(
      'Export-Import Bank of the United States',
      '2025-present: Confirmed as president and chairman of EXIM.',
    ),
  ],
  'executive-jeffery-s-hall-farm-credit-administration': [
    positionRecord(
      'Agricultural policy and Senate staff',
      '1980s-1994: Worked in Kentucky agricultural policy and served as agriculture legislative assistant to Senator Mitch McConnell.',
    ),
    positionRecord(
      'University of Kentucky College of Agriculture',
      '1994-2001: Advised the dean on state and federal legislative issues and managed the Ag-Project 2000 economic-development initiative.',
    ),
    positionRecord(
      'USDA Farm Service Agency and Capstone Group',
      '2001-2015: Led Kentucky operations for USDA’s Farm Service Agency and later co-founded The Capstone Group.',
    ),
    positionRecord(
      'Farm Credit Administration',
      '2015-present: Joined the FCA board, also served on the Farm Credit System Insurance Corporation board, and became chairman and CEO in 2025.',
    ),
  ],
  'executive-kyle-s-hauptman-national-credit-union-administration': [
    positionRecord(
      'Lehman Brothers and Jefferies',
      '1990s-2000s: Worked as a bond trader in New York, Tokyo, and Sydney before becoming a senior vice president at Jefferies.',
    ),
    positionRecord(
      'Main Street Growth Project and SEC advisory work',
      '2010s: Led the Main Street Growth Project and served on the SEC Advisory Committee on Small and Emerging Companies.',
    ),
    positionRecord(
      'Senate staff and Trump transition',
      '2010s: Served as Senator Tom Cotton’s economic-policy advisor, staff director for a Senate Banking subcommittee, and a member of Trump’s 2016 transition team.',
    ),
    positionRecord(
      'National Credit Union Administration',
      '2020-present: Confirmed to the NCUA Board in 2020 and designated chairman in 2025.',
    ),
  ],
  'executive-laura-dibella-federal-maritime-commission': [
    positionRecord(
      'Nassau County and Port of Fernandina',
      '2010s: Led local economic-development work in Nassau County and later became the first full-time executive director of the Port of Fernandina.',
    ),
    positionRecord(
      'Florida seaport policy',
      '2010s-2020s: Worked with the Florida Harbor Pilots Association on port-improvement and commerce legislation tied to Florida’s seaports.',
    ),
    positionRecord(
      'Florida commerce leadership and private practice',
      '2023-2025: Served as Florida’s first female secretary of commerce, led Enterprise Florida, and then worked as a government-affairs advisor at Adams and Reese.',
    ),
    positionRecord(
      'Federal Maritime Commission',
      '2026-present: Confirmed in late 2025, sworn in in January 2026, and designated chairman later that month.',
    ),
  ],
  'executive-michael-m-kubayanda-postal-regulatory-commission': [
    positionRecord(
      'House Oversight Committee',
      '2000s: Served as counsel to the House Committee on Oversight and Government Reform.',
    ),
    positionRecord(
      'USPS Office of Inspector General',
      '2010s: Worked in the OIG research group and later as director of government relations, focusing on postal economics, analytics, privacy, and innovation.',
    ),
    positionRecord(
      'Private-sector technology work',
      'Late 2010s: Served as a board member and privacy officer for a digital-health startup.',
    ),
    positionRecord(
      'Postal Regulatory Commission',
      '2018-present: Joined the Commission in 2018, became vice chairman in 2019, and has served as chairman since 2021.',
    ),
  ],
  'executive-patrick-fuchs-surface-transportation-board': [
    positionRecord(
      'Early public-service roles',
      '2000s: Worked at the State Department, the Government Accountability Office, and the National Center for Freight and Infrastructure Research and Education.',
    ),
    positionRecord(
      'Office of Management and Budget',
      'Early 2010s: Served as a policy analyst and Presidential Management Fellow handling railroad and maritime regulatory reviews.',
    ),
    positionRecord(
      'Senate Commerce Committee',
      '2010s: Served as a senior professional staff member for Chairman John Thune and helped develop major rail, maritime, and transportation-safety legislation.',
    ),
    positionRecord(
      'Surface Transportation Board',
      '2019-present: Sworn in as a board member in 2019, reconfirmed in 2024, and designated chairman in 2025.',
    ),
  ],
  'executive-don-moul-tennessee-valley-authority': [
    positionRecord(
      'Utility and nuclear operations',
      '1980s-2010s: Built a multi-decade power-operations career at companies including American Electric Power, Duquesne Light, FirstEnergy, GPU Nuclear, and PSE&G.',
    ),
    positionRecord(
      'NextEra Energy',
      'Late 2010s-2021: Served as executive vice president and chief nuclear officer, overseeing the company’s nuclear fleet and decommissioning work.',
    ),
    positionRecord(
      'TVA chief operating officer',
      '2021-2025: Joined TVA as executive vice president and chief operating officer, overseeing coal, gas, hydro, transmission, and power-supply functions.',
    ),
    positionRecord(
      'Tennessee Valley Authority',
      '2025-present: Appointed by TVA’s board as president and chief executive officer.',
    ),
  ],
  'executive-marco-m-rajkovich-federal-mine-safety-and-health-review-commission': [
    positionRecord(
      'U.S. Steel Mining Company',
      '1980s: Started in mining as a summer engineering student and later worked as an engineer and foreman.',
    ),
    positionRecord(
      'Private legal practice',
      '1990s-2010s: Spent nearly two decades at Wyatt Tarrant & Combs before becoming a partner at Rajkovich, Williams, Kilpatrick & True.',
    ),
    positionRecord(
      'Federal Mine Safety and Health Review Commission',
      '2019-2024: Served as chairman from 2019 to 2021 and then as commissioner from 2021 to 2024.',
    ),
    positionRecord(
      'Return to FMSHRC leadership',
      '2024-present: Served as commission counsel in 2024-2025 and returned as chairman in 2025.',
    ),
  ],
  'executive-anna-davis-federal-mediation-and-conciliation-service': [
    positionRecord(
      'FMCS counsel roles',
      'By 2022: Appeared in FMCS and Federal Register materials as deputy general counsel.',
    ),
    positionRecord(
      'Ethics and FOIA oversight',
      '2023-2024: Served in FMCS legal leadership roles including designated agency ethics official and chief FOIA officer.',
    ),
    positionRecord(
      'General Counsel',
      'By 2024: FMCS materials identified her as the agency’s general counsel.',
    ),
    positionRecord(
      'Federal Mediation and Conciliation Service',
      '2025-present: Serves as general counsel performing the duties of the director.',
    ),
  ],
  'executive-marvin-e-kaplan-national-labor-relations-board': [
    positionRecord(
      'Private practice and Labor Department work',
      '2000s: Worked at McDowell Rice Smith & Buchanan and later in the Labor Department’s Office of Labor-Management Standards.',
    ),
    positionRecord(
      'House labor and oversight counsel',
      '2010s: Served as counsel on the House Oversight and Government Reform Committee and as policy counsel for the House Education and the Workforce Committee.',
    ),
    positionRecord(
      'Occupational Safety and Health Review Commission',
      'Mid-2010s: Served as chief counsel to the chairman of OSHRC.',
    ),
    positionRecord(
      'National Labor Relations Board',
      '2017-2025: Served on the NLRB, including stints as chairman in 2017-2018 and again in 2025.',
    ),
  ],
  'executive-loren-sweatt-national-mediation-board': [
    positionRecord(
      'House labor-policy staff work',
      '2000s-2010s: Spent about 15 years as a senior policy advisor on the House Committee on Education and the Workforce.',
    ),
    positionRecord(
      'Occupational Safety and Health Administration',
      '2010s-2020s: Served for nearly four years as principal deputy assistant secretary at OSHA.',
    ),
    positionRecord(
      'Senate HELP Committee',
      'Early 2020s: Served as a senior professional staff member on the Senate Health, Education, Labor, and Pensions Committee.',
    ),
    positionRecord(
      'National Mediation Board',
      '2024-present: Confirmed as a board member in 2024 and later became chair.',
    ),
  ],
  'executive-jonathan-snare-occupational-safety-and-health-review-commission': [
    positionRecord(
      'Private law practice',
      '1990s-2003: Worked in private practice in Dallas before entering federal service.',
    ),
    positionRecord(
      'Department of Labor leadership roles',
      '2003-2009: Held senior Labor Department roles including deputy assistant secretary, acting assistant secretary for OSHA, deputy solicitor, and acting solicitor of labor.',
    ),
    positionRecord(
      'Morgan Lewis',
      '2009-2024: Partner in the Washington office of Morgan Lewis, focused largely on workplace safety and health matters.',
    ),
    positionRecord(
      'Occupational Safety and Health Review Commission',
      '2025-present: Confirmed and sworn in as an OSHRC commissioner in 2025.',
    ),
  ],
  'executive-rochelle-garza-united-states-commission-on-civil-rights': [
    positionRecord(
      'Civil-rights legal practice',
      '2010s: Built a legal career focused on immigration, family, criminal, and constitutional law.',
    ),
    positionRecord(
      'Reproductive-rights litigation',
      '2010s: Became nationally known for Garza v. Hargan, which secured abortion access for an immigrant teen in federal custody.',
    ),
    positionRecord(
      'Texas Civil Rights Project',
      '2020s: Served as president of the Texas Civil Rights Project.',
    ),
    positionRecord(
      'Public office and civil-rights leadership',
      '2022-present: Was the Democratic nominee for Texas attorney general in 2022 and later joined the U.S. Commission on Civil Rights, where she became chair.',
    ),
  ],
  'executive-edward-forst-general-services-administration': [
    positionRecord(
      'Finance and investment career',
      '1980s-2020s: Built a multi-decade career in finance, real estate, senior management, academia, and government.',
    ),
    positionRecord(
      'Goldman Sachs',
      '1990s-2000s: Served as a general partner, management committee member, co-CEO of Goldman Sachs Asset Management, and later chief administrative officer.',
    ),
    positionRecord(
      'Senior management outside Wall Street',
      '2010s-2020s: Held major executive roles beyond Goldman, including work tied to institutional real-estate and operations leadership.',
    ),
    positionRecord(
      'General Services Administration',
      '2025-present: Confirmed and sworn in as administrator of the GSA.',
    ),
  ],
  'executive-eric-ueland-office-of-government-ethics': [
    positionRecord(
      'Senate Republican leadership staff',
      '1990s-2000s: Held multiple Capitol Hill roles including chief of staff to Senate Republican leaders and staff director for the Senate Budget and Rules Committees.',
    ),
    positionRecord(
      'Development and foreign-affairs posts',
      '2000s-2010s: Served at the Millennium Challenge Corporation and later in senior State Department roles tied to civilian security, democracy, human rights, and foreign assistance.',
    ),
    positionRecord(
      'Trump White House and OMB',
      '2019-2025: Served in the first Trump White House as director of legislative affairs and deputy director of the Domestic Policy Council, then returned as OMB deputy director for management.',
    ),
    positionRecord(
      'Office of Government Ethics',
      '2025-present: Performing the duties of the director of OGE.',
    ),
  ],
  'executive-mary-anne-carter-national-foundation-on-the-arts-and-the-humanities': [
    positionRecord(
      'Policy and communications work',
      'Before joining the federal government: Worked in public policy analysis, issue tracking, and communications.',
    ),
    positionRecord(
      'National Endowment for the Arts senior leadership',
      '2010s: Served as senior deputy chairman of the NEA.',
    ),
    positionRecord(
      'Acting and confirmed chair in Trump’s first term',
      '2018-2021: First served as acting chairman and then as Senate-confirmed chairman of the NEA.',
    ),
    positionRecord(
      'Return to NEA leadership',
      '2025-present: Returned as chairman of the NEA.',
    ),
  ],
  'executive-ho-nieh-nuclear-regulatory-commission': [
    positionRecord(
      'Knolls Atomic Power Laboratory and Navy nuclear training',
      'Early career: Worked as a civilian instructor for the Navy’s Nuclear Power Program.',
    ),
    positionRecord(
      'International nuclear-safety work',
      'Before returning to U.S. regulation: Served as communications advisor to the International Atomic Energy Agency and later led the OECD Nuclear Energy Agency’s Division of Nuclear Safety Technology and Regulation.',
    ),
    positionRecord(
      'NRC staff leadership',
      '1997-2021: Joined the NRC as a resident inspector and rose through senior roles including chief of staff to a commissioner, regional leadership posts, and director of the Office of Nuclear Reactor Regulation.',
    ),
    positionRecord(
      'Southern Nuclear and NRC chairmanship',
      '2021-present: Served in regulatory-affairs leadership at Southern Nuclear before returning to government as an NRC commissioner in late 2025 and chairman in early 2026.',
    ),
  ],
  'executive-patricia-l-lee-defense-nuclear-facilities-safety-board': [
    positionRecord(
      'Centers for Disease Control and Prevention',
      'Early career: Spent nearly a decade evaluating the health and environmental impact of DOE nuclear-weapons facilities.',
    ),
    positionRecord(
      'Savannah River National Laboratory',
      '2000s-2020s: Served for more than two decades in radiation-protection and nuclear-safety roles, most recently as portfolio manager for the laboratory’s digital enterprise.',
    ),
    positionRecord(
      'DOE headquarters advisory roles',
      'Later career: Held technical-advisor assignments to DOE’s Office of Environmental Management and served as a liaison to the Defense Nuclear Facilities Safety Board.',
    ),
    positionRecord(
      'Defense Nuclear Facilities Safety Board',
      '2020s-present: Joined the board after more than 30 years in nuclear-safety and radiation-protection work.',
    ),
  ],
  'executive-craig-t-brown-selective-service-system': [
    positionRecord(
      'U.S. Navy and Navy Reserve',
      'Career-long military service: Served for more than 29 years in the Navy and Navy Reserve, including multiple commands and a deployment command in Kuwait.',
    ),
    positionRecord(
      'Defense contracting and program management',
      'Pre-2018: Worked for more than 20 years as a DoD contractor supporting joint, Army, and Navy programs.',
    ),
    positionRecord(
      'Selective Service senior executive',
      '2018-2020: Joined the Selective Service System and entered the Senior Executive Service.',
    ),
    positionRecord(
      'Selective Service System',
      '2021-present: Became acting director in January 2021 and has overseen the agency’s headquarters, data center, regional offices, and mobilization readiness.',
    ),
  ],
  'executive-erhard-r-chorle-railroad-retirement-board': [
    positionRecord(
      'Illinois state government legal and regulatory roles',
      'Early career: Served as senior assistant to the Illinois labor director, deputy secretary of state, and Illinois state securities commissioner.',
    ),
    positionRecord(
      'Governor Jim Edgar administration and pension oversight',
      '1990s: Served as executive assistant for financial and regulatory affairs to Governor Jim Edgar and chaired the Illinois State Board of Investment.',
    ),
    positionRecord(
      'Private legal practice',
      'Before joining the RRB: Was a partner in the corporate and business-counseling practice at Pedersen & Houpt in Chicago.',
    ),
    positionRecord(
      'Railroad Retirement Board',
      '2019-present: Appointed and confirmed as chairman of the Board.',
    ),
  ],
  'executive-sara-aviel-inter-american-foundation': [
    positionRecord(
      'International development NGOs and Yale teaching',
      'Early career: Worked in field and headquarters roles at CARE, Mercy Corps, and Root Capital, and later taught international development and humanitarian relief at Yale.',
    ),
    positionRecord(
      'Treasury and White House international economic policy',
      '2009-2012: Served as senior advisor to Treasury Secretary Timothy Geithner and then as director for international economic affairs at the National Economic Council and National Security Council.',
    ),
    positionRecord(
      'World Bank and OMB',
      '2012-2017: Served as U.S. alternate executive director at the World Bank Group and later as chief of staff and executive associate director at the Office of Management and Budget.',
    ),
    positionRecord(
      'Inter-American Foundation',
      '2022-present: Became president and CEO of the Inter-American Foundation after additional development-policy work at CSIS, Brookings, and through her own firm.',
    ),
  ],
  'executive-thomas-r-hardy-trade-and-development-agency': [
    positionRecord(
      'USTDA congressional and public affairs',
      'By 2018: Served as the agency’s director for congressional and public affairs.',
    ),
    positionRecord(
      'Acting director in Trump’s first term',
      '2017-2020: Led USTDA as acting director during the first Trump administration.',
    ),
    positionRecord(
      'Program-management leadership',
      '2020s: Served as director for program management and as a member of the agency’s executive committee overseeing regional teams and project portfolios.',
    ),
    positionRecord(
      'Return to agency leadership',
      '2020s-present: Returned as acting director of USTDA.',
    ),
  ],
  'executive-eric-ueland-united-states-agency-for-international-development': [
    positionRecord(
      'Senate and Republican policy leadership',
      '1990s-2000s: Built his career in senior Senate roles, including chief of staff to Republican leaders and staff director for the Budget and Rules Committees.',
    ),
    positionRecord(
      'Private-sector and foreign-assistance roles',
      '2007-2021: Worked at the Duberstein Group, then served in the first Trump administration and at the State Department on legislative affairs and foreign-assistance issues.',
    ),
    positionRecord(
      'OMB and OGE',
      '2025: Returned to government as OMB deputy director for management and also served as acting director of the Office of Government Ethics.',
    ),
    positionRecord(
      'United States Agency for International Development',
      'Late 2025-present: Began performing the duties of the USAID administrator and chief operating officer.',
    ),
  ],
  'executive-travis-hill-federal-deposit-insurance-corporation': [
    positionRecord(
      'Regions Financial Corporation',
      '2011-2013: Worked as a policy analyst at Regions Financial.',
    ),
    positionRecord(
      'Senate Banking Committee',
      '2013-2018: Served as senior counsel on the Senate Banking, Housing, and Urban Affairs Committee and worked on bipartisan banking legislation.',
    ),
    positionRecord(
      'FDIC policy leadership',
      '2018-2022: Served first as senior advisor to the chairman and then as deputy to the chairman for policy.',
    ),
    positionRecord(
      'Federal Deposit Insurance Corporation',
      '2023-present: Became FDIC vice chairman in 2023, acting chairman in January 2025, and chairman in January 2026.',
    ),
  ],
  'executive-amy-a-karpel-united-states-international-trade-commission': [
    positionRecord(
      'Stewart and Stewart',
      'Early career: Worked as an associate attorney on antidumping and countervailing-duty matters and related trade appeals.',
    ),
    positionRecord(
      'Office of the U.S. Trade Representative',
      'More than 13 years: Worked on trade negotiations and WTO disputes, including as chief counsel for negotiations, legislation, and administrative law.',
    ),
    positionRecord(
      'U.S. International Trade Commission commissioner',
      '2019-present: Confirmed in 2019 and sworn in as a USITC commissioner that year.',
    ),
    positionRecord(
      'United States International Trade Commission chair',
      '2024-present: Designated chair in June 2024.',
    ),
  ],
  'executive-roger-harris-national-railroad-passenger-corporation-amtrak': [
    positionRecord(
      'Airline and commercial strategy roles',
      'Earlier career: Held commercial and strategic leadership roles at Delta Air Lines, Sun Country Airlines, GMAC Financial Services, Northwest Airlines, and KLM.',
    ),
    positionRecord(
      'Aeromexico',
      'Before Amtrak: Served as senior vice president of revenue, distribution, and alliances.',
    ),
    positionRecord(
      'Amtrak commercial leadership',
      '2019-2022: Joined Amtrak in 2019 and rose to executive vice president, marketing and revenue, and chief commercial officer.',
    ),
    positionRecord(
      'National Railroad Passenger Corporation',
      '2022-present: Assumed the role of Amtrak president in July 2022.',
    ),
  ],
  'executive-david-steiner-united-states-postal-service': [
    positionRecord(
      'Phelps Dunbar',
      'Earlier career: Practiced law and became a partner at Phelps Dunbar.',
    ),
    positionRecord(
      'Waste Management',
      '2000-2016: Joined the company in 2000, rose through general counsel and chief financial officer, and served as chief executive officer from 2004 to 2016.',
    ),
    positionRecord(
      'Corporate and nonprofit boards',
      '2017-2025: Held board roles including lead independent director of FedEx and director positions at several major companies.',
    ),
    positionRecord(
      'United States Postal Service',
      '2025-present: Appointed by the USPS Board of Governors and began serving as the 76th postmaster general and chief executive officer in July 2025.',
    ),
  ],
  'executive-andrea-r-lucas-equal-employment-opportunity-commission': [
    positionRecord(
      'Employment law practice',
      'Before EEOC: Worked as a senior associate at Gibson, Dunn & Crutcher focused on employment law.',
    ),
    positionRecord(
      'Equal Employment Opportunity Commission commissioner',
      '2020-present: Nominated by Donald Trump in 2020 and confirmed later that year.',
    ),
    positionRecord(
      'Acting chair',
      '2025-present: Designated acting chair by President Trump on January 20, 2025.',
    ),
    positionRecord(
      'Renomination',
      '2025: Renominated for another EEOC term in March 2025.',
    ),
  ],
  'executive-colleen-kiko-federal-labor-relations-authority': [
    positionRecord(
      'Early federal labor-relations work',
      '1979-2002: Worked in the FLRA’s predecessor agency and then in its regional office and headquarters after the modern FLRA opened in 1979.',
    ),
    positionRecord(
      'Employees’ Compensation Appeals Board and FLRA general counsel',
      '2002-2017: Served as an ECAB judge, with a break from 2005 to 2008 to serve as FLRA general counsel.',
    ),
    positionRecord(
      'Federal Labor Relations Authority member',
      '2017-present: Returned to the FLRA as a member in December 2017.',
    ),
    positionRecord(
      'Federal Labor Relations Authority chairmanship',
      '2017-2021 and 2025-present: Served as chair in the first Trump term and again beginning February 2025.',
    ),
  ],
  'executive-andrew-fois-administrative-conference-of-the-united-states': [
    positionRecord(
      'Justice Department and federal prosecution',
      '1980s-1990s: Served in multiple Justice Department roles including assistant U.S. attorney in Washington and later assistant attorney general for legislative affairs.',
    ),
    positionRecord(
      'Capitol Hill and private practice',
      '1990s-2000s: Worked as chief counsel to a House Judiciary subcommittee, then held roles at the National Crime Prevention Council, in solo practice, and at Venable.',
    ),
    positionRecord(
      'District government and federal courts administration',
      '2010s: Served as deputy attorney general for public safety in the D.C. Attorney General’s office and later as an attorney advisor in the Administrative Office of the U.S. Courts.',
    ),
    positionRecord(
      'Administrative Conference of the United States',
      '2022-present: Senate-confirmed chair of ACUS.',
    ),
  ],
  'executive-shana-m-broussard-federal-election-commission': [
    positionRecord(
      'Louisiana legal work',
      'Earlier career: Served as a New Orleans assistant district attorney and later as deputy disciplinary counsel at the Louisiana Attorney Disciplinary Board.',
    ),
    positionRecord(
      'IRS and FEC counsel roles',
      '2008-2020: Worked in the IRS Office of Professional Responsibility and then at the FEC, including as counsel to Commissioner Steven Walther.',
    ),
    positionRecord(
      'Federal Election Commission commissioner',
      '2020-present: Nominated by President Trump and confirmed in December 2020 as the first Black FEC commissioner.',
    ),
    positionRecord(
      'Federal Election Commission chair',
      '2021 and 2025-present: Served as chair in 2021 and again beginning in July 2025.',
    ),
  ],
  'executive-michael-f-gerber-federal-retirement-thrift-investment-board': [
    positionRecord(
      'Law and corporate practice',
      'Early career: Began in corporate and securities law at what is now Faegre Drinker Biddle & Reath.',
    ),
    positionRecord(
      'Pennsylvania public service',
      '2000s: Served in the Pennsylvania House of Representatives and later as a trustee of the State Employees’ Retirement System.',
    ),
    positionRecord(
      'Investment management',
      '2010s-2020s: Worked at FS Investments, became a partner and senior advisor there, and also co-founded Intrinsic Capital Partners.',
    ),
    positionRecord(
      'Federal Retirement Thrift Investment Board',
      '2022-present: Confirmed to the FRTIB in 2022 and designated chair that same year.',
    ),
  ],
  'executive-henry-kerner-merit-systems-protection-board': [
    positionRecord(
      'Prosecution',
      'Before entering congressional oversight work: Spent roughly 18 years as a career prosecutor, much of that time in Compton, California.',
    ),
    positionRecord(
      'House Oversight Committee',
      '2011-2017: Joined the House Oversight and Government Reform Committee and worked on investigations and whistleblower matters.',
    ),
    positionRecord(
      'Office of Special Counsel',
      '2017-2023: Served as U.S. special counsel overseeing whistleblower and prohibited-personnel-practice cases.',
    ),
    positionRecord(
      'Merit Systems Protection Board',
      '2024-present: Joined the MSPB and now serves as vice chairman and acting chairman.',
    ),
  ],
  'executive-will-scharf-national-capital-planning-commission': [
    positionRecord(
      'Clerkship, prosecution, and Missouri policy work',
      'Early legal career: Built experience through appellate clerkships, service as an assistant U.S. attorney, and policy work in Missouri state government.',
    ),
    positionRecord(
      'Trump legal work',
      '2020s: Joined Donald Trump’s legal team and became involved in major Trump-era litigation and presidential-power cases.',
    ),
    positionRecord(
      'White House staff role',
      '2025-present: Became White House staff secretary in January 2025.',
    ),
    positionRecord(
      'National Capital Planning Commission',
      '2025-present: Appointed to the NCPC and named chair in July 2025.',
    ),
  ],
  'executive-scott-kupor-office-of-personnel-management': [
    positionRecord(
      'Early tech-operations leadership',
      'Before venture capital: Held senior leadership roles at a web-hosting company later acquired by Hewlett Packard, including responsibility for a large global support organization.',
    ),
    positionRecord(
      'Andreessen Horowitz',
      '2009-2025: Joined the firm at its founding and eventually became managing partner as it grew into one of the country’s largest venture-capital firms.',
    ),
    positionRecord(
      'Industry and teaching roles',
      '2010s-2020s: Also served as chairman of the National Venture Capital Association and taught entrepreneurship at Stanford Graduate School of Business.',
    ),
    positionRecord(
      'Office of Personnel Management',
      '2025-present: Sworn in as OPM director in July 2025.',
    ),
  ],
  'executive-jamieson-greer-united-states-office-of-special-counsel': [
    positionRecord(
      'Air Force JAG',
      'Early career: Served in the U.S. Air Force Judge Advocate General’s Corps, including a deployment to Iraq.',
    ),
    positionRecord(
      'First Trump trade term and private practice',
      '2017-2024: Served as chief of staff to Ambassador Robert Lighthizer at USTR during the first Trump administration and later became a partner in private practice focused on trade and national-security matters.',
    ),
    positionRecord(
      'United States Trade Representative',
      '2025-present: Confirmed as U.S. trade representative in February 2025.',
    ),
    positionRecord(
      'Office of Special Counsel',
      '2025-present: Appointed acting special counsel on March 21, 2025.',
    ),
  ],
  'executive-jared-isaacman-national-aeronautics-and-space-administration': [
    positionRecord(
      'Shift4 founder',
      '1999-2025: Left high school at 16 to start United Bank Card, the company that became Shift4, and led it through its 2020 public listing before stepping down as chief executive in 2025.',
    ),
    positionRecord(
      'Draken International',
      '2011-2019: Co-founded Draken International and built a private adversary-air fleet used to train U.S. military pilots.',
    ),
    positionRecord(
      'Commercial spaceflight',
      '2021-2024: Commanded Inspiration4, the first all-civilian orbital spaceflight, and later led Polaris Dawn, which included the first commercial spacewalk.',
    ),
    positionRecord(
      'National Aeronautics and Space Administration',
      '2025-present: Confirmed and sworn in as NASA’s 15th administrator in December 2025.',
    ),
  ],
  'executive-brian-stone-national-science-foundation': [
    positionRecord(
      'Polar-program operations',
      '2000s-2010s: Held infrastructure, logistics, and research-support roles inside NSF’s Office of Polar Programs.',
    ),
    positionRecord(
      'NSF central leadership staff',
      'Later career: Moved into the Foundation’s central leadership team as chief of staff in the Office of the Director.',
    ),
    positionRecord(
      'Acting agency leadership',
      '2025-present: Became chief of staff performing the duties of the NSF director.',
    ),
    positionRecord(
      'Policy and funding rollout',
      '2025-present: Has served as the public face on major NSF priorities including AI, quantum, EPSCoR, and advanced-manufacturing announcements.',
    ),
  ],
  'executive-peter-feldman-consumer-product-safety-commission': [
    positionRecord(
      'Senate Commerce Committee',
      'Before CPSC: Served as senior counsel to the Senate Commerce, Science, and Transportation Committee and worked on bipartisan legislation and oversight touching CPSC and FTC issues.',
    ),
    positionRecord(
      'Consumer Product Safety Commission commissioner',
      '2018-present: Nominated by President Trump and confirmed in 2018, then later reconfirmed to a full seven-year term.',
    ),
    positionRecord(
      'Vice chairman',
      'Before 2025: Chosen by fellow commissioners to serve as vice chairman.',
    ),
    positionRecord(
      'Consumer Product Safety Commission acting chairman',
      '2025-present: Became acting chairman in January 2025.',
    ),
  ],
  'executive-jennifer-tahmasebi-corporation-for-national-and-community-service': [
    positionRecord(
      'National-service and youth-service work',
      '1990s: Worked in service and youth-engagement roles including AmeriCorps program work and service positions tied to Youth Service America and COOL.',
    ),
    positionRecord(
      'YouthBuild USA',
      'Late 1990s-2010: Spent about 11 years at YouthBuild USA, rising through multiple roles and overseeing AmeriCorps programming.',
    ),
    positionRecord(
      'AmeriCorps senior leadership',
      '2010s-2020s: Returned to federal service in senior AmeriCorps program-leadership roles.',
    ),
    positionRecord(
      'Corporation for National and Community Service',
      '2025-present: Serves as interim agency head of AmeriCorps.',
    ),
  ],
  'executive-paul-shea-peace-corps': [
    positionRecord(
      'Peace Corps finance leadership',
      '2010s: Served in senior financial-management roles at the Peace Corps, including as deputy chief financial officer.',
    ),
    positionRecord(
      'Acting CFO period',
      '2017-2018: Helped lead agency financial management during the period covered in Peace Corps financial-reporting releases.',
    ),
    positionRecord(
      'Peace Corps chief executive role',
      'August 2025-January 2026: Elevated from acting chief financial officer to chief executive officer during the 2025 leadership reshuffle.',
    ),
    positionRecord(
      'Peace Corps senior advisor',
      'January 2026-present: Continued with the agency as a senior advisor after Richard Swartz was named acting director.',
    ),
  ],
  'executive-janet-dhillon-pension-benefit-guaranty-corporation': [
    positionRecord(
      'Skadden Arps',
      '1990s-2000s: Began her legal career at Skadden, Arps, Slate, Meagher & Flom and practiced there for 13 years.',
    ),
    positionRecord(
      'Fortune 500 general counsel roles',
      '2000s-2010s: Served as general counsel at major companies including US Airways, JCPenney, Burlington Stores, and Dollar Tree.',
    ),
    positionRecord(
      'Equal Employment Opportunity Commission',
      '2019-2022: Served as an EEOC commissioner, including as chair from 2019 to 2021.',
    ),
    positionRecord(
      'Labor Department and PBGC',
      '2020s-present: Held senior roles in Labor Department benefits and solicitor offices and later became director of the PBGC in 2025.',
    ),
  ],
  'executive-frank-bisignano-social-security-administration': [
    positionRecord(
      'Citigroup',
      '2002-2005: Led Citigroup’s Global Transactions Services business and sat on the management committee.',
    ),
    positionRecord(
      'JPMorgan Chase',
      '2005-2013: Held senior executive roles including co-chief operating officer, head of mortgage banking, and chief administrative officer.',
    ),
    positionRecord(
      'First Data and Fiserv',
      '2013-2025: Ran First Data as chief executive and then led Fiserv after the merger, eventually serving as chairman and chief executive.',
    ),
    positionRecord(
      'Social Security Administration',
      '2025-present: Sworn in as the 18th commissioner of Social Security in May 2025.',
    ),
  ],
  'executive-benjamin-black-overseas-private-investment-corporation': [
    positionRecord(
      'Corporate law',
      'Early career: Worked as a corporate mergers-and-acquisitions attorney at Sullivan & Cromwell.',
    ),
    positionRecord(
      'Private equity and credit investing',
      '2000s-2010s: Worked in private equity at Apollo Global Management and later as a senior portfolio manager at Knowledge Universe Holdings.',
    ),
    positionRecord(
      'Fortinbras Enterprises',
      'Before returning to government: Founded Fortinbras Enterprises and led investment work across credit, restructuring, and strategic opportunities.',
    ),
    positionRecord(
      'Development Finance Corporation / OPIC successor role',
      '2025-present: Became chief executive of the U.S. International Development Finance Corporation after Senate confirmation in October 2025.',
    ),
  ],
  'executive-pete-marocco-united-states-african-development-foundation': [
    positionRecord(
      'Marine Corps',
      '1990s: Enlisted in the Marine Corps at 17 and later became a platoon sergeant.',
    ),
    positionRecord(
      'State and Commerce national-security roles',
      '2010s: Served as a State Department official for conflict and stabilization work and later as a senior advisor for intelligence and security at the Commerce Department.',
    ),
    positionRecord(
      'Pentagon Africa policy',
      '2019-2020: Served as deputy assistant secretary of defense for African affairs.',
    ),
    positionRecord(
      'Trump foreign-assistance roles',
      '2025-present: Returned in senior Trump-era foreign-assistance roles including work tied to State, USAID, and the USADF-linked profile in this dataset.',
    ),
  ],
  'executive-michael-rigas-united-states-agency-for-global-media': [
    positionRecord(
      'Private-sector finance',
      'Before federal service: Worked at Mellon Financial and Brown Brothers Harriman.',
    ),
    positionRecord(
      'First Trump administration management posts',
      '2018-2021: Served in senior federal management roles including OPM deputy director, acting OPM director, acting OMB deputy director for management, and acting federal CIO.',
    ),
    positionRecord(
      'Transition and policy work',
      '2022-2024: Directed the America First Policy Institute transition project and advised the Trump-Vance transition.',
    ),
    positionRecord(
      'State, GSA, and USAGM-linked leadership',
      '2025-present: Became deputy secretary of state for management and resources, served as acting GSA administrator in 2025, and is associated with the current USAGM profile in this dataset.',
    ),
  ],
  'executive-bill-pulte-federal-housing-finance-agency': [
    positionRecord(
      'Housing and investment career',
      '2010s: Built a career in homebuilding, housing products, and community-development investing.',
    ),
    positionRecord(
      'Pulte Capital Partners and Pulte Homes',
      '2011-2025: Founded Pulte Capital Partners and also served on the board of Pulte Homes.',
    ),
    positionRecord(
      'Philanthropy and civic work',
      '2010s-2020s: Built a public profile through anti-blight work and direct-giving philanthropy.',
    ),
    positionRecord(
      'Federal Housing Finance Agency',
      '2025-present: Sworn in as FHFA director in March 2025.',
    ),
  ],
  'executive-kelly-loeffler-small-business-administration': [
    positionRecord(
      'Financial-services executive',
      '1990s-2018: Built a long career in finance and technology, including senior executive roles at Intercontinental Exchange.',
    ),
    positionRecord(
      'Bakkt',
      '2018-2019: Became founding chief executive and first employee of Bakkt.',
    ),
    positionRecord(
      'U.S. Senate',
      '2020-2021: Served as U.S. senator from Georgia.',
    ),
    positionRecord(
      'Post-Senate political and business work and SBA',
      '2021-present: Founded Greater Georgia Action and RallyRight and later became administrator of the Small Business Administration in 2025.',
    ),
  ],
}
