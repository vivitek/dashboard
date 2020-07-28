import React from 'react'
import Container from 'reactstrap/lib/Container'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Line, Doughnut } from 'react-chartjs-2'

const Home = () => {
	return (
		<Container fluid>
			<Row>
				<Col md="6">
					<Card>
						<CardBody>
							<CardTitle>Data</CardTitle>
							<Line data={canvas => {
									var ctx = canvas.getContext("2d");
									const chartColor = '#FFFFFF';
									var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
									gradientStroke.addColorStop(0, '#80b6f4');
									gradientStroke.addColorStop(1, chartColor);

									var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
									gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
									gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
									return {
										labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
										datasets: [{
											label: "Active Users",
											borderColor: "#f96332",
											pointBorderColor: "#FFF",
											pointBackgroundColor: "#f96332",
											pointBorderWidth: 2,
											pointHoverRadius: 4,
											pointHoverBorderWidth: 1,
											pointRadius: 4,
											fill: true,
											backgroundColor: gradientFill,
											borderWidth: 2,
											data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
										}]
									}
								}
							}/>
						</CardBody>
					</Card>
				</Col>
				<Col md="6">
					<Card>
						<CardBody>
							<CardTitle>Other Data...</CardTitle>
							<Doughnut data={canvas => {
									var ctx = canvas.getContext("2d");
									const chartColor = '#FFFFFF';
									var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
									gradientStroke.addColorStop(0, '#80b6f4');
									gradientStroke.addColorStop(1, chartColor);

									var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
									gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
									gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
									return {
										labels: ["Red", "Green", "Yellow"],
										datasets: [{
											backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
											data: [300, 50, 100]
										}]
									}
								}} />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Home