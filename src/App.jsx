
import LogoSvg from 'constants/LogoSvg';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import img from './constants/Img';
import './style/App.scss';
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import LogoBg from "assets/Images/BackgroundImage.jpg";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const containerStyle = {
    backgroundImage: `url('https://rightclick.com.sa/logoBg.png')`,
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const [loading, setloading] = useState(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('you name is required'),
    email: Yup.string().email('Please enter a valid email address').required('The email field is required.'),
    phone: Yup.string().required('The phone field is required.'),
    reason: Yup.string().required('The reason field is required.'),
    message: Yup.string().required('The message field is required.'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      reason: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      await ContantServices('en', values).then(({ data }) => {
        setloading(false)
        toast.success(data?.message)
        resetForm();
      })
    }
  });

  const ContantServices = async (values, body) => {
    setloading(true)
    const url = `${process.env.REACT_APP_API_URL}/home/send-contact-us`;
    let data = await axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'application/json',
        'Accept-Language': values,
      }
    }).catch((err) => {
      setloading(false)

    })
    return data
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])
  return (
    <div className='overflow-hidden comming_soon'>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: ' Arial, Helvetica, sans-serif',
            textTransform: 'capitalize',
            zIndex: '9999',
            // background: '#000',
            // color: '#fff',
            borderRadius: '10px',
            boxShadow: '10px 10px 10px rgba(188, 188, 188, 0.16)',
            background: '#fff',
            color: '#000',
          },
        }}
        containerStyle={{
          bottom: 50
        }}
      />
      <Row>
        <Col xl={2} lg={2} md={12} sm={12} data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="2000"
          data-aos-easing="ease-out-cubic">
          <div className="d-none d-lg-flex justify-content-center align-items-center h-100 contact_form d-md-none d-sm-none d-xs-none">
            <div className="form">
              <div className="logo">
                <img src={img.logo} alt="" srcset="" />
              </div>
              <Form className='p-5' onSubmit={formik.handleSubmit} >
                <Row className=' '>
                  <Col xl={12} lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.name && formik.errors.name}
                        className='input-style' type="text" placeholder='Enter user name' />
                      {formik.touched.name && formik.errors.name && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.name}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12}>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Control
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && formik.errors.email}
                        className='input-style' type="email" placeholder='Enter your email' />
                      {formik.touched.email && formik.errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Control
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.phone && formik.errors.phone}
                        className='input-style' type="tel" placeholder='Enter your phone' />
                      {formik.touched.phone && formik.errors.phone && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.phone}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                      <Form.Control
                        name="reason"
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.reason && formik.errors.reason}
                        className='input-style' type="text" placeholder='Enter your reason' />
                      {formik.touched.reason && formik.errors.reason && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.reason}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea5">
                      <Form.Control
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.message && formik.errors.message}
                        className='input-style' as="textarea" rows={5} placeholder='Enter your message' />
                      {formik.touched.message && formik.errors.message && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="flex justify-content-center align-items-center">
                  <Button loading={loading} size='small' iconPos={'left'} icon="pi pi-check" severity='warning' type='submit' label={'Send'} className='rounded-2 mt-4 p-2 px-4' />
                </div>
              </Form>
            </div>
          </div>
        </Col>
        <Col xl={10} lg={10} md={12} sm={12} className='comming_soon_bg' >
          <div className=" flex flex-column" style={containerStyle}>
            <div className="comming_soon_title">
              <h1>coming soon</h1>
              <div className="icons d-flex flex-row justify-content-center align-items-center ">
                <div className='icons_svg m-0 p-0' data-aos="flip-left"
                  data-aos-delay="1000"
                  data-aos-duration="1500"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Food1 />
                </div>
                <div className='icons_svg m-0 p-0' data-aos="flip-left"
                  data-aos-delay="1500"
                  data-aos-duration="2000"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Food2 />
                </div>
                <div className='icons_svg m-0 p-0' data-aos="flip-left"
                  data-aos-delay="2000"
                  data-aos-duration="2000"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Food3 />
                </div>
                <div className='icons_svg m-0 p-0' data-aos="flip-left"
                  data-aos-delay="2500"
                  data-aos-duration="2000"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Food4 />
                </div>
              </div>
              <div data-aos="fade-left"
                data-aos-delay="1500"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic">
                <hr />
              </div>
              <div className="contact d-flex justify-content-center mt-5 flex-column align-items-center gap-3 "  >
                <div className="email d-flex gap-2" data-aos="fade-up"
                  data-aos-delay="1500"
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Email />
                  <a href="mailto:Gulf.factoryfood@mail.sa">Gulf.factoryfood@mail.sa</a>
                </div>
                <div className="phone d-flex gap-2" data-aos="fade-up"
                  data-aos-delay="2000"
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic">
                  <LogoSvg.Contact />
                  <a href="tel+9967697517711">+996 769-751-7711</a>
                </div>
                <div data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500">
                  <Button icon="pi pi-phone" className='btn_modal mt-3' variant="primary" onClick={() => setModalShow(true)} label='Contact us' severity='warning' raised />

                </div>
              </div> 
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <div className="form flex justify-content-center align-items-center flex-column pt-5">
            <div className="logo">
              <img src={img.logo} alt="" srcset="" />
            </div>
            <Form className='p-5' onSubmit={formik.handleSubmit} >
              <Row className=' '>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.name && formik.errors.name}
                      className='input-style' type="text" placeholder='Enter user name' />
                    {formik.touched.name && formik.errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>

                <Col xl={12} lg={12} md={12} sm={12}>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Control
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                      className='input-style' type="email" placeholder='Enter your email' />
                    {formik.touched.email && formik.errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>

                <Col xl={12} lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Control
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.phone && formik.errors.phone}
                      className='input-style' type="tel" placeholder='Enter your phone' />
                    {formik.touched.phone && formik.errors.phone && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phone}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>

                <Col xl={12} lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Control
                      name="reason"
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.reason && formik.errors.reason}
                      className='input-style' type="text" placeholder='Enter your reason' />
                    {formik.touched.reason && formik.errors.reason && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.reason}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>

                <Col xl={12} lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea5">
                    <Form.Control
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.message && formik.errors.message}
                      className='input-style' as="textarea" rows={5} placeholder='Enter your message' />
                    {formik.touched.message && formik.errors.message && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="flex justify-content-center align-items-center">
                <Button loading={loading} size='small' iconPos={'left'} icon="pi pi-check" severity='warning' type='submit' label={'Send'} className='rounded-2 mt-4 p-2 px-4' />
              </div>
            </Form>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default App;
