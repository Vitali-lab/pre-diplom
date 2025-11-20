import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../components/icon/Icon";
import { getUsers } from "../../../bff/api/back-end/get-users";
import Loader from "../../../components/loader/Loader";
import { RatingStars } from "../../../components/raring-stars/RatingStars";
import { correctDate } from "../../../utils/correctDate";

const CommentsContainer = ({ className, product }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const getUserName = (id) => users.find((user) => user.id === id)?.name || "Аноним";

  const comments = product?.rating?.users || [];

  return (
    <div className={className}>
      <h2>Отзывы</h2>
      {comments.length > 0 ? (
        comments.map((user) => (
          <div className="comment" key={user.userId + user.date}>
            <div className="icon-and-name">
              <Icon id="user" />
              <p>{getUserName(user.userId)}</p>
            </div>
            <div className="comment-and-stars">
              <div className="stars">
                <RatingStars userRating={user.userRating} />
              </div>
              <p className="text">{user.userComment}</p>
            </div>
            <div className="date">
              <p>{correctDate(user.date)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="nothing">Нет отзывов</div>
      )}
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0;
  padding: 20px;
  box-shadow: var(--box-shadow);
  border-radius: 12px;
  gap: 20px;
  background: #fff;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    align-self: flex-start;
  }

  .comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 95%;
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 8px;
    gap: 20px;
    transition: background 0.3s ease;

    &:hover {
      background: #fafafa;
    }
  }

  .icon-and-name {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    font-weight: 500;
  }

  .comment-and-stars {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .stars {
      display: flex;
      gap: 6px;
    }

    .text {
      font-size: 14px;
      color: #333;
      line-height: 1.4;
    }
  }

  .date {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #999;
  }

  .nothing {
    font-size: 14px;
    color: #777;
    text-align: center;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .comment {
      flex-direction: column;
      align-items: flex-start;
    }

    .date {
      justify-content: flex-start;
    }
  }
`;