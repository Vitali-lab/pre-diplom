import styled from "styled-components";
import { Icon } from "../../components/icon/Icon";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { scrollTop } from "../../utils/scrollTop";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const DeliveryContainer = ({ className }) => {
  useEffect(() => {
    scrollTop();
  }, []);

  const deliveryMethods = [
    {
      title: "Курьерская доставка",
      description: "Доставка курьером по Минску в течение 1-2 рабочих дней",
      price: "Бесплатно при заказе от 200 руб.",
      icon: "truck",
    },
    {
      title: "Европочта",
      description: "Доставка через Европочту в любой регион страны",
      price: "Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",
      icon: "envelope",
    },
    {
      title: "Белпочта",
      description: "Доставка через Белпочту по всей Беларуси",
      price: "Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",
      icon: "truck",
    },
    {
      title: "Самовывоз",
      description: "Заберите заказ самостоятельно из нашего пункта выдачи",
      price: "Бесплатно",
      icon: "home",
    },
  ];

  const paymentMethods = [
    {
      title: "Онлайн оплата",
      description:
        "Банковской картой Visa, MasterCard, МИР через защищенный платежный шлюз",
      icon: "credit-card",
    },
    {
      title: "Наличными курьеру",
      description:
        "Оплата наличными при получении заказа (только для курьерской доставки)",
      icon: "money",
    },
    {
      title: "При получении",
      description:
        "Оплата наложенным платежом при получении в отделении почты ",
      icon: "shopping-bag",
    },
  ];

  const faq = [
    {
      question: "Как отследить заказ?",
      answer:
        "После оформления заказа вы получите номер отслеживания на email. Также вы можете отследить статус заказа в личном кабинете.",
    },
    {
      question: "Можно ли изменить адрес доставки?",
      answer:
        "Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нами по телефону или email.",
    },
    {
      question: "Что делать, если товар не подошел?",
      answer:
        "Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и с бирками.",
    },
    {
      question: "Есть ли доставка в другие страны?",
      answer:
        "В настоящее время мы доставляем только по территории России. О доставке в другие страны уточняйте у наших менеджеров.",
    },
  ];

  return (
    <div className={className}>
      <motion.section
        className="delivery-section"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Доставка и оплата 📦
        </motion.h2>

        <motion.div
          className="delivery-methods"
          initial="hidden"
          animate="visible"
        >
          <h3>Способы доставки</h3>
          <div className="methods-grid">
            {deliveryMethods.map((method, i) => (
              <motion.div
                key={i}
                className="method-card"
                custom={i}
                variants={fadeUp}
              >
                <Icon id={method.icon} />
                <h4>{method.title}</h4>
                <p>{method.description}</p>
                <span className="price">{method.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="payment-methods"
          initial="hidden"
          animate="visible"
        >
          <h3>Способы оплаты</h3>
          <div className="methods-grid">
            {paymentMethods.map((method, i) => (
              <motion.div
                key={i}
                className="method-card"
                custom={i + 4}
                variants={fadeUp}
              >
                <Icon id={method.icon} />
                <h4>{method.title}</h4>
                <p>{method.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="faq-section" initial="hidden" animate="visible">
          <h3>Часто задаваемые вопросы</h3>
          <div className="faq-list">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                className="faq-item"
                custom={i + 7}
                variants={fadeUp}
              >
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact-info"
          initial="hidden"
          animate="visible"
          custom={11}
          variants={fadeUp}
        >
          <h3>Нужна помощь?</h3>
          <p>Наша служба поддержки работает ежедневно с 9:00 до 21:00</p>
          <div className="contact-details">
            <p>
              <strong>Телефон:</strong> +7 (800) 123-45-67
            </p>
            <p>
              <strong>Email:</strong> support@holly-shop.ru
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export const Delivery = styled(DeliveryContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  background: transparent;
  border-radius: 20px;
  margin-top: 20px;
  min-height: 600px;

  .delivery-section {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 24px;
    text-align: center;
  }

  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  .methods-grid {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 24px;
    margin-bottom: 20px;
  }

  .method-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 34px;
    text-align: center;
    transition: all 0.3s ease;

    & i {
      font-size: 48px;
      color: #545454ff;
      margin-bottom: 16px;
      display: block;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }

    p {
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .price {
      font-size: 1rem;
      font-weight: 600;
      color: #000000ff;
      display: block;
      margin-top: 8px;
    }
  }

  .faq-section {
    margin-top: 20px;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .faq-item {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      background: #f3f4f6;
      border-left-color: #ec4899;
    }

    h4 {
      font-size: 1.1rem;
      margin-bottom: 8px;
      color: #1f2937;
    }

    p {
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
    }
  }

  .contact-info {
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    color: black;
    margin-top: 20px;

    h3 {
      color: black;
      margin-bottom: 16px;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;
      margin-bottom: 12px;
      color: rgba(1, 0, 0, 0.95);
    }

    .contact-details {
      margin-top: 20px;

      p {
        font-size: 1.1rem;
        margin-bottom: 8px;

        strong {
          font-weight: 600;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    .methods-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .method-card {
      padding: 20px;
    }

    .contact-info {
      padding: 24px;
    }
  }
`;
